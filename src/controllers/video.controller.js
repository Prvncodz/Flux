import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloud} from "../utils/cloudinary.js"


// get all exixting users
const getAllVideos = asyncHandler(async (req, res) => {
       //get all the query with req.query set page=1 and limit=10 as default so the code will not break by loading all docs at once

      //convert the string to number where needed
      // validate values 
      
      //use queries and sort if there any 

      // use those values to get the data
      
      //return the recieved data
      
      
      const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
      
     
     const pageNum=parseInt(page)
     const limitNum=parseInt(limit)
     const skipNum=(pageNum-1)*limitNum

     if (isNaN(pageNum) || pageNum<1) {
       throw new ApiError(400,"page number is invalid")
     }
     if(isNaN(limitNum)|| limitNum<1){
    throw new ApiError(400,"limit number is invalid")
  }
      //we will make a filter object which will help in filtering the videos with user search query if there is an query given
     const filter={}
      if(query){
     filter.title={$regex:query,$options:"i"},
     filter.owner=userId
  }   
    const sort={}
     if(sortBy){
     sort[sortBy]=sortType==="desc"?-1:1;
  }
    const videos=await Video
    .find(filter)
    .sort(sort)
    .skip(skipNum)
    .limit(limitNum)
    
  
   
  return res.json(
    new ApiResponse(
      200,
      videos,
      "videos fetched succesfully"
    )
    );
  })

// publish a video
const publishAVideo = asyncHandler(async (req, res) => {
      const { title, description} = req.body
      // TODO: get video, upload to cloudinary, create video
})

//get video details by its id
const getVideoById = asyncHandler(async (req, res) => {
        const { videoId } = req.params
                //TODO: get video by id
})
  
//update changes existing video
const updateVideo = asyncHandler(async (req, res) => {
       const { videoId } = req.params                     //TODO: update video details like title, description, thumbnail
})
  
//delete a Video
const deleteVideo = asyncHandler(async (req, res) => {
     const { videoId } = req.params
  //       //TODO: delete videos
  })

//video is published or not
const togglePublishStatus = asyncHandler(async (req, res) => {
   const { videoId } = req.params
 })
  
     export {
   getAllVideos,
   publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus
  }
  

