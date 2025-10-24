import mongoose,{isValidObjectId} from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
      //TODO: get all comments for a videoId
     const {videoId} = req.params
    if(!isValidObjectId(videoId)){
    throw new ApiError(400,"This video is invalid or removed by the user")
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
    const {videoId}=req.params
    
    if(!isValidObjectId(videoId)){
    throw new ApiError(400,"This video is invalid or removed by the user")
    }
    const {content} =req.body
    if (!content) {
      throw new ApiError(400,"Add content to add to a comment in this video!")
    }
    const addedComment=await Comment.create(
    {
      content,
      video:videoId,
      owner:req.user?._id
    }
  )
   if (!addedComment) {
    throw new ApiError(501,"Unable to add comment")
   }
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      addedComment,
      "Comment added successfully!"
    ));
})
  
const updateComment = asyncHandler(async (req, res) => {
              // TODO: update a comment
      const {commentId}=req.params
      const {newContent}=req.body
      if (!isValidObjectId(commentId)) {
        throw new ApiError(400,"This comment is invalid or removed by the user")
      }
      if(!newContent){
    throw new ApiError(400,"new content should be provided to update the comment")
  }
   
  const comment= await Comment.findByIdAndUpdate(
    commentId,
    {
      $set:{
        content:newContent
      }
    },
    {new:true}
  )

   return res
  .status(200)
  .json(new ApiResponse(
      200,
     comment,
      "comment updated successfully"
    ));
  })
  
const deleteComment = asyncHandler(async (req, res) => {
              // TODO: delete a comment
      const {commentId}=req.params
      const deletedComment=await Comment.findByIdAndDelete(commentId)
     if (!deletedComment) {
      throw new ApiError(500,"Unable to delete your comment")
     }
  return res
    .status(200)
    .json(new ApiResponse(
      200,
      deletedComment,
      "Deleted comment successfully"
    ));
   })
  
   export {
  getVideoComments, 
  addComment, 
  updateComment,
   deleteComment
    }
  

