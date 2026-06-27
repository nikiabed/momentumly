import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const uri: string = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

async function run() {
  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db("todo-app");
  const todos = db.collection("todos");

  const res = await todos.updateMany({}, { $set: { boardKey: "myDay" } });

  console.log(res);

  await client.close();
}

run();
