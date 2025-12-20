import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";
import { verifyJwt } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();
router.use(verifyJwt); // Apply verifyJWT middleware to all routes in this file

//all routes are secure here

router.get("/all-videos", getAllVideos);

router.post(
  "/publish-video",
  upload.fields([
    { name: "videofile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishAVideo,
);

router.get("/c/:videoId", getVideoById);

router.patch(
  "/c/:videoId/update-video",
  upload.single("thumbnail"),
  updateVideo,
);

router.delete("/c/:videoId/delete-video", deleteVideo);

router.post("/c/:videoId/toggle-publish-status", togglePublishStatus);

export default router;
