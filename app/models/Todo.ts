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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  myDayDate: {
    type: String,
    default: null,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
