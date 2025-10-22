import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloud} from "../utils/cloudinary.js"


// get all exixting users
const getAllVideos = asyncHandler(async (req, res) => {
    
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
     filter.title={$regex:query,$options:"i"}
  }   
     if(userId){
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
    
  
   
  return res
    .status(200)
    .json(
    new ApiResponse(
      200,
      videos,
      "videos fetched succesfully"
    )
    );
  })

// publish a video
const publishAVideo = asyncHandler(async (req, res) => {
  try{
      const { title, description} = req.body
    
  // get video file,thumbnail,owner,title,description, duration of the video from cloudinary,togglePublishStatus
  
  // validate things

  //upload video and thumbnail to cloudinary

  // creat a video with mongoose models
  
  //check if null 

  //return video
   
   if(!title){
    throw new ApiError(407,"title field is required to publish a video")
  }
   const videoFileToPath=req.files?.videofile?.[0]?.path;
   const thumbnailFileToPath=req.files?.thumbnail?.[0]?.path;

  if(!videoFileToPath){
  throw new ApiError(400,"unable to fetch video file path")
  }
  if(!thumbnailFileToPath){
  throw new ApiError(400,"unable to fetch thumbsnail file path")                                 }
  
  const videoResponse = await uploadOnCloud(videoFileToPath)
  const thumbnailResponse = await uploadOnCloud(thumbnailFileToPath)

  if(!videoResponse){
    throw new ApiError(500,"video upload to cloudinary failed")
  }
  if(!thumbnailResponse){                              throw new ApiError(500,"thumbnail upload to cloudinary failed")
  }
  const user=await User.findById(req.user?._id)
  if(!user){
    throw ApiError(400,"cannot find user")
  }
  const publishedVideo= await Video.create({
    videofile:{
        public_id:videoResponse.public_id,
        url:videoResponse.url
      },
    thumbnail:{
        public_id:thumbnailResponse.public_id,         url:thumbnailResponse.url
      },
    owner:user._id,
    description:description?description:"",
    title:title,
    duration:videoResponse?.duration,
    isPublished:true
    })
  if(!publishedVideo){
    throw new ApiError(500,"error while publishing video")
  }
  
  return res
  .status(200)
  .json(
      new ApiResponse(200,publishedVideo,"videopublished succesfully")
    )

  }catch(error){
    console.log("Error :",error.message)
   throw new ApiError(500,"unable to publish the video")
    
  }
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
  

