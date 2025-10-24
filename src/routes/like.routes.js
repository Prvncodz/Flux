import { Router } from 'express';
import {
    getLikedVideos,
        toggleCommentLike,
            toggleVideoLike,
                toggleTweetLike,
                } from "../controllers/like.controller.js"
import {verifyJwt} from "../middlewares/auth.js"

const router = Router();
router.use(verifyJwt); // Apply verifyJWT middleware to all routes in this file

router.post("/toggle/v/:videoId",toggleVideoLike)
router.route("/toggle/c/:commentId",toggleCommentLike)
router.route("/toggle/t/:tweetId",toggleTweetLike)
router.route("/videos",getLikedVideos)

export default router

