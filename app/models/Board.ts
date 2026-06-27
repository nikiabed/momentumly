import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    icon: String,
    color: String,
    boardKey: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    theme: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
