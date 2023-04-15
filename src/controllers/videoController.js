import mongoose from "mongoose";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  return res.render("watch", { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Vidoe" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        view: 0,
        rating: 0,
      },
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Vidoe",
      errorMessage: error._message,
    });
  }
};
