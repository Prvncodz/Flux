import mongoose, { Schema } from "mongoose";

const viewSchema = new Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const View = mongoose.model("View", viewSchema);
