import express from "express";
import {
  refgisterView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", refgisterView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete(
  "/videos/:id([0-9a-f]{24})/:id([0-9a-f]{24})/delete",
  deleteComment
);

export default apiRouter;
