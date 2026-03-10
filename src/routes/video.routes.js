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



router.get("/all-videos", getAllVideos);

router.post(
  "/publish-video",
  upload.fields([
    { name: "videofile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  verifyJwt,
  publishAVideo,
);

router.get("/c/:videoId", getVideoById);

router.patch(
  "/c/:videoId/update-video",
  upload.single("thumbnail"),
  verifyJwt,
  updateVideo,
);

router.delete("/c/:videoId/delete-video", verifyJwt, deleteVideo);

router.post("/c/:videoId/toggle-publish-status", verifyJwt, togglePublishStatus);

export default router;
