import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    _id: String,
    data: Object,
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema);
