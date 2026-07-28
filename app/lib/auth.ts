import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import Todo from "@/app/models/Todo";
import Board from "@/app/models/Board";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB();
      let dbUser = await User.findOne({
        email: user.email,
      });

      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
        });

        const todoResult = await Todo.updateMany(
          {
            userId: { $exists: false },
          },
          {
            $set: {
              userId: dbUser._id.toString(),
            },
          },
        );
        const boardResult = await Board.updateMany(
          {
            userId: { $exists: false },
          },
          {
            $set: {
              userId: dbUser._id.toString(),
            },
          },
        );
      }

      if (!dbUser.preferences) {
        dbUser.preferences = {
          boardThemes: {
            important: "fire",
            search: "purple",
          },
        };

        await dbUser.save();
      }

      return true;
    },

    async jwt({ token }) {
      await connectDB();

      const dbUser = await User.findOne({
        email: token.email,
      });

      if (dbUser) {
        token.id = dbUser._id.toString();
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
