import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
      const { channelId } = req.params

      if(!isValidObjectId(channelId)){
     throw new ApiError(400,"invalid channel id")
  }
     const existingSubscribtion=await Subscription.findOne({
     channel:channelId,
     subscriber:req.user._id
  })

   if(existingSubscribtion){

    const unsubscribed=await Subscription.findByIdAndDelete(existingSubscribtion._id)

   if(!unsubscribed){
      throw new ApiError(500,"unable to unsubscribe the channel")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        unsubscribed,
        "channel unsubscribed successfully"
      ))
  }

  const subscribed=await Subscription.create({
    channel:channelId,
    subscriber:req.user._id
  })
  if(!subscribed){
    throw new ApiError(500,"channel subscriptionsuccessfull")
  }
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      subscribed,
      "channel subscribed successfully"
    ))
})
  
  // controller to return subscriber list of a channel
  const getUserChannelSubscribers = asyncHandler(async (req, res) => {
     const {channelId} = req.params
    })

   // controller to return channel list to which user has subscribed
      const getSubscribedChannels = asyncHandler(async (req, res) => {
         const { subscriberId } = req.params
         })

 export {
        toggleSubscription,
           getUserChannelSubscribers,
              getSubscribedChannels
                   }

