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

router.get("/:videoId/get-video-comments",getVideoComments)

router.post("/:videoId/add-comment",addComment)

router.patch("/:commentId/update-comment",updateComment)

router.delete("/:commentId/delete-comment",deleteComment)


export default router

