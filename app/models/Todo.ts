import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
   userId: {
    type: String,
    default: null,
  },
  title: String,
  status: Boolean,
  isImportant: Boolean,
  item: String,
  boardKey: String,
  isEdit: Boolean,
  createdAt: Date,
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
