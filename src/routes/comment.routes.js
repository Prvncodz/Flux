import { Router } from 'express';
import {
    addComment,
        deleteComment,
            getVideoComments,
                updateComment,
                } from "../controllers/comment.controller.js"
import {verifyJwt} from "../middlewares/auth.js"

const router = Router();

router.use(verifyJwt); // Apply verifyJWT middleware to all routes in this file

router.get("/c/:videoId/get-video-comments",getVideoComments)

router.delete("/c/:commentId/delete-comment",deleteComment)

export default router

