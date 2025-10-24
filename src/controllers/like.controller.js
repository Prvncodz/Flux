import { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Like } from "../models/like.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
      const {videoId} = req.params
      if(!isValidObjectId(videoId)){
     throw new ApiError(400,"object id invalid")
  }
     const existingLike=await Like.findOne({
      video:videoId,
      likedBy:req.user?._id
  })

  if (existingLike) {
     const disliked=await Like.findByIdAndDelete(existingLike._id)
    
    return res
    .status(200)
    .json(new ApiResponse(
          200,
          disliked,
          "video disliked successfully"
      ))
  }

     const liked=  await Like.create(
      {
      video:videoId,
      likedBy:req.user?._id
    }
  )
   if (!liked) {
    throw new ApiError(500,"unable to like the video")
   }
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      liked,
      "video liked successfully!"
    ))
  })
  
const toggleCommentLike = asyncHandler(async (req, res) => {
      const {commentId} = req.params
          //TODO: toggle like on comment
  
   })
const toggleTweetLike = asyncHandler(async (req, res) => {
         const {tweetId} = req.params
         //TODO: toggle like on tweet
                  }
                  )
  
  const getLikedVideos = asyncHandler(async (req, res) => {
                      //TODO: get all liked videos
        })
  
     export {
             toggleCommentLike,
             toggleTweetLike,
             toggleVideoLike,   
             getLikedVideos
  }
