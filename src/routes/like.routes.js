import { Router } from "express";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleVideoLike,
  toggleTweetLike,
  getTweetLikesCount,
} from "../controllers/like.controller.js";
import { verifyJwt } from "../middlewares/auth.js";

const router = Router();
 // Apply verifyJWT middleware to all routes in this file

router.post("/toggle/v/:videoId",verifyJwt, toggleVideoLike);
router.post("/toggle/c/:commentId",verifyJwt, toggleCommentLike);
router.post("/toggle/t/:tweetId",verifyJwt, toggleTweetLike);
router.get("/videos",verifyJwt, getLikedVideos);
router.get("/likes/:tweetId",getTweetLikesCount);

export default router;
