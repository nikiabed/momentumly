import mongoose, { Schema } from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: Boolean,
      default: false,
    },

    isImportant: {
      type: Boolean,
      default: false,
    },

    item: {
      type: String,
      default: "",
    },

    boardKey: {
      type: String,
      default: null,
    },

    isEdit: {
      type: Boolean,
      default: false,
    },

    myDayDate: {
      type: String,
      default: null,
    },

    deadline: {
      type: Date,
      default: null,
    },

    attachment: {
      type: String,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
    completionSource: {
      type: String,
      enum: ["realtime", "manual"],
      default: null,
    },
    trackedTimeSeconds: {
      type: Number,
      default: 0,
    },
    parentTodoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      default: null,
    },

    isAIStep: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
