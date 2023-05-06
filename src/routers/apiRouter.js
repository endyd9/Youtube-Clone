import express from "express";
import { refgisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", refgisterView);

export default apiRouter;
