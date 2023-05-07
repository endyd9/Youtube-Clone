import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, require: true },
  owner: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Video" },
  cratedAt: { type: Date, require: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
