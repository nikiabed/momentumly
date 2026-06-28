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
    theme: {
      type: {
        type: String,
        enum: ["color", "image"],
        default: "color",
      },
      value: {
        type: String,
        default: "sunset",
      },
    },
    appearance: {
      bg: {
        type: {
          type: String,
          enum: ["color", "image"],
          default: "color",
        },
        value: String,
      },
      textColor: {
        type: String,
        enum: ["light", "dark"],
        default: "dark",
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
