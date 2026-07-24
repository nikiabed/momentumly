import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,

  preferences: {
    type: Object,
    default: {
      systemBoards: {
        important: {
          theme: "fire",
        },
        search: {
          theme: "purple",
        },
      },
    },
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
