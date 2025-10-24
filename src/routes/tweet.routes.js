import { Router } from 'express';
import {
    createTweet,
        deleteTweet,
            getUserTweets,
                updateTweet,
                } from "../controllers/tweet.controller.js"
import {verifyJwt} from "../middlewares/auth.js"

const router = Router();
router.use(verifyJwt); // Apply verifyJwt middleware to all routes in this file

router.post("/create-tweet",createTweet)
router.get("/:userId",getUserTweets)
router.patch("/:tweetId/update-tweet",updateTweet)
router.delete("/:tweetId/delete-tweet",deleteTweet)

export default router

