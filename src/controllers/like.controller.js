import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "object id invalid");
  }
  const video = await Video.findById(videoId);
  if (!video.isPublished) {
    throw new ApiError(
      400,
      "this video is unpublished unable to like the video",
    );
  }

  const existingLike = await Like.findOne({
    video: videoId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    const disliked = await Like.findByIdAndDelete(existingLike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, disliked, "video disliked successfully"));
  }

  const liked = await Like.create({
    video: videoId,
    likedBy: req.user?._id,
  });
  if (!liked) {
    throw new ApiError(500, "unable to like the video");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, liked, "video liked successfully!"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "object id invalid");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    const disliked = await Like.findByIdAndDelete(existingLike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, disliked, "Comment disliked successfully"));
  }

  const liked = await Like.create({
    comment: commentId,
    likedBy: req.user?._id,
  });
  if (!liked) {
    throw new ApiError(500, "unable to like the comment");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, liked, "Comment liked successfully!"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "object id invalid");
  }
  const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    const disliked = await Like.findByIdAndDelete(existingLike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, disliked, "tweet disliked successfully"));
  }

  const liked = await Like.create({
    tweet: tweetId,
    likedBy: req.user?._id,
  });
  if (!liked) {
    throw new ApiError(500, "unable to like the tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, liked, "tweet liked successfully!"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  if (isNaN(pageNum) || pageNum < 1) {
    throw new ApiError(400, "page number is invalid");
  }
  if (isNaN(limitNum) || limitNum < 1) {
    throw new ApiError(400, "page number is invalid");
  }
  const skipNum = (pageNum - 1) * limitNum;

  const allLikedDocsByUser = await Like.find({ likedBy: req.user._id })
    .populate("video")
    .skip(skipNum)
    .limit(limitNum);

  if (!allLikedDocsByUser) {
    throw new ApiError(500, "Unable to get all liked docs");
  }
  const allLikedVideos = allLikedDocsByUser.map((Like) => Like.video);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allLikedVideos,
        "fetched all liked videos successfully",
      ),
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
