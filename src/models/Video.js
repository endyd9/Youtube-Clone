import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 0,
    maxLength: 100,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) =>
      word.startsWith("#") ? `#${word.replace(/#/g, "")}` : `#${word}`
    );
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
