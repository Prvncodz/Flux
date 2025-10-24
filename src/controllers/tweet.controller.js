import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
      const {content}=req.body
      if (!content) {
        throw ApiError(400,"You forgot to add content for tweet :)")
      }
   const createdTweet=await Tweet.create({
    content,
    owner:req.user._id
  })
   if (!createdTweet) {
    throw new ApiError(500,"unable to create tweet")
   }
  return res
  .status(200)
  .json(
      new ApiResponse(
        200,
        createdTweet,
        "created a tweet"
      )
    );
})

const getUserTweets=asyncHandler(async(req,res)=>{
     
})
const updateTweet=asyncHandler(async(req,res)=>{
  
  })
const deleteTweet=asyncHandler(async(req,res)=>{

})

           export {
                 createTweet,
                    getUserTweets,
                         updateTweet,
                           deleteTweet
                     }
  
