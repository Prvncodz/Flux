import mongoose,{isValidObjectId} from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
      //TODO: get all comments for a videoId
     const {videoId} = req.params
    if(!isValidObjectId(videoId)){
    throw new ApiError(400,"Video id is invalid or removed by the user")
  }
      const {page = 1, limit = 10} = req.query

     const pageNum=parseInt(page)
     const limitNum=parseInt(limit)
     const skipNum=(pageNum-1)*limitNum

     if(isNaN(pageNum)|| pageNum<1){
    throw new ApiError(403,"page number is invalid")
  }
    if(isNaN(limitNum)|| limitNum<1){
    throw new ApiError(403,"page number is invalid")                                             }
    const comments=await Comment
    .find({video:videoId})
    .skip(skipNum)
    .limit(limitNum)
     
    if(!comments){
    throw new ApiError(501,"Unable to fetch Comments")
  }
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      comments,
      "Fetched all comments on this video successfully"
    ));

    })
  
const addComment = asyncHandler(async (req, res) => {
              // TODO: add a comment to a video
})
  
const updateComment = asyncHandler(async (req, res) => {
              // TODO: update a comment
  })
  
const deleteComment = asyncHandler(async (req, res) => {
              // TODO: delete a comment
   })
  
   export {
  getVideoComments, 
  addComment, 
  updateComment,
   deleteComment
    }
  

