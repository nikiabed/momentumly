import mongoose, { Schema, model, models } from "mongoose";

const TodoEntrySchema = new Schema(
  {
    todoId: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
      index: true,
    },

    durationSeconds: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
TodoEntrySchema.index(
  {
    todoId: 1,
    userId: 1,
    date: 1,
  },
  {
    unique: true,
  },
);
export const TodoEntry =
  models.TodoEntry || model("TodoEntry", TodoEntrySchema);
