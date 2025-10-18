import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import router from "../routes/user.routes.js"
import {upload} from "../middlewares/multer.js"
import {uploadOnCloud,deleteFromCloud} from "../utils/cloudinary.js"
import {ApiResponse}  from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


// generate refresh and access tokens for the user
const generateAccessAndRefreshTokens=async(userId)=>{
   console.log("generateAccessAndRefreshTokens is called ")
    try{
	const user=await User.findById(userId)
	const accessTokens=await user.generateAccessTokens()
	const refreshTokens=await user.generateRefreshTokens()
  
	user.refreshTokens=refreshTokens
   await  user.save({validateBeforeSave:false})
    return {accessTokens,refreshTokens};

}catch(error){
       throw new ApiError(500,"unable to generate access and refresh tokens")
	}
}

//register
const  registerUser=asyncHandler(async (req,res)=>{
        // we will get the user info
        // validate the info
       //check is user already exists - username
        // check for images
        // if there is an image for avatar upload to cloudinary
        // make user object and store in db
        // while removing the pass and refreshTokens because we dont want to send them in the response.
        // return res

 const {fullName,userName,password,email}=req.body
    console.log("pass :",password);
if([fullName,userName,password,email].some((feild) =>feild?.trim()==="")){
  throw new ApiError(400,"All feilds are required");
}
  //we should await before interacting with the db
  const existsUser=await User.findOne({userName});
  if(existsUser){
throw new ApiError(402,"user already exists");
}

  const avatarLocalPath=req.files?.avatar?.[0]?.path;
 const coverImageLocalPath=req.files?.coverImage?.[0]?.path;

if(!avatarLocalPath){
   throw new ApiError(403,"avatar file path is required to register");
}   // we should use await while the file get uploaded to the cloud from the local path
   const avatar= await uploadOnCloud(avatarLocalPath)
 
  const coverImage=await uploadOnCloud(coverImageLocalPath)
   if(!avatar){
 throw new ApiError(403,"avatar is required to register");
}
  
 const user=await User.create({
    userName:userName.toLowerCase(),
    fullName,
    email,
    avatar:avatar,
    coverImage:coverImage?coverImage||{},
    password
})
   const createdUser=await User.findById(user._id).select(" -password -refreshTokens")
   if(!createdUser){
   throw new ApiError(500,"Unable to register user")
   }

  return res.status(200).json( new ApiResponse(200,createdUser,"User registered successfully"));
})

//login
const  loginUser=asyncHandler(async (req,res)=>{
          //get the info
         // validate the input
         // check for user in db
        // check password
        //get res from db
       // generate acces and refresh tokens
       //  send cookie
     const {userName,password}=req.body;
    if(!userName){
	throw new ApiError(407,"username and password are required to login");
	}
    const user=await User.findOne({userName});

    if(!user){
 	throw new ApiError(404,"user is not registered yet");
	}

    const isPassValid=await user.isPasswordCorrect(password)
    if(!isPassValid){
        throw new ApiError(401,"invalid password credentials");

        }

  const { accessTokens, refreshTokens } = await generateAccessAndRefreshTokens(user._id);
  

     const loggedUser=await User.findById(user._id).select("-password -refreshTokens")
     
  const options={
    httpOnly:true,
    secure:true
  }
  
    return res
    .status(200)
    .cookie("accessTokens",accessTokens,options)
    .cookie("refreshTokens",refreshTokens,options)
    .json( new ApiResponse(
      200,
      {
        user:loggedUser,accessTokens,refreshTokens
      },
      "user logged in successfully"));

})
//logoutUser

const logoutUser=asyncHandler(async (req,res)=>{
   await User.findByIdAndUpdate(
    req.user._id,
  {
    $set:{
      accessTokens:undefined
    }
  },
    {
      new:true
    }
  )
   const options={                                 httpOnly:true,                                 secure:true                                }
  
  return res
    .status(200)
    .clearCookie("accessTokens",options)
    .clearCookie("refreshTokens",options)
    .json( 
      new ApiResponse(200,{},"user loggedout successfully")
    )
})

//update access tokens
const refreshAccessTokens=asyncHandler(async(req,res)=>{
  const  incomingRefreshTokens=req.cookies.refreshTokens || req.body.refreshTokens

  if (!incomingRefreshTokens) {
    throw new ApiError(401,"unauthorized refreshToken ")
  }

  const decodedToken=await jwt.verify(incomingRefreshTokens,process.env.REFRESH_TOKEN_SECRET)
  const user=await User.findById(decodedToken?._id)
 if (!user) {
  throw new ApiError(404,"user not found")
 }
  if (user.refreshTokens!==decodedToken) {
    throw new ApiError(404,"refresh tokens expired")
  }
  const {accessTokens,refreshTokens}= await generateAccessAndRefreshTokens(user._id)

  const options={                                       httpOnly:true,                              secure:true                                      }
  return res
  .status(200)
  .cookie("accessTokens",accessTokens,options)
  .cookie("refreshTokens",refreshTokens,options)
  .json(new ApiResponse(
      200,
      {user:user,accessTokens,refreshTokens},
      "generated new access tokens successfully"
    ))

})

//change password

const changePassword=asyncHandler(async(req,res)=>{
  const {oldPassword,newPassword}=req.body
  const user=await User.findById(req.user?_id)
  const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)
  if(!isPasswordCorrect){
    throw new ApiError(400,"wrong password")
  }
   user.password=newPassword
   await user.save({validateBeforeSave:false})
   return res
    .status(200)
    .json(new ApiResponse(200,"Your password is changed successfully"));
})

//get current user
const currentUser=asyncHandler(async (req,res) => {
  return res
  .status(200)
  .json(new ApiResponse(200,req.user,"current user fetched successfully"))

})

//update account information
const updateAccountInfo=asyncHandler(async(req,res)=>{
   {fullName,email}=req.body
   if (!(fullName||email)) {
    throw new ApiError(400,"fullname and email are required to update the account information ")
  }
    const user=await User.findByIdAndUpdate(
     req.user?._id,
      {
      $set:{
        fullName:fullName,
        email:email
      } 
      },
      {
         new :true
      }
    ).select("-password")
   return res
    .status(200)
    .json(new ApiResponse(200,user,"information updated successfully"));
})

// update user avatar
const updateUserAvatar=asyncHandler(async(req,res)=>{
       const avatarLocalPath=req.file?.path
       if (!avatarLocalPath) {
         throw new ApiError(400,"uploaded avatar file path unaccessable")
       }
       const avatar=uploadOnCloud(avatarLocalPath)
    console.log(avatar);
  if (!avatar) {
      throw new ApiError(401,"clodinary upload of avatar failed")
    }
    const user=req.user   
   const fileToBeDeleted=user.avatar.public_id
  if (!fileToBeDeleted) {
    throw new ApiError(500,"unable to find old avatae file") 
  }

  const updateAvatar=  await User.findByIdAndUpdate(
    user?._id,
    {
      set:{
        avatar:avatar
      }
    },
    {new:true}
  ).select("-password")
  
 const fileDeleted=await deleteFromCloud(fileToBeDeleted)
  if (!fileDeleted) {
    throw new ApiError(500,"unable to delete old avatar file");
  }
  console.log("avatar file deleted");
  return res
  .status(200)
  .json(new ApiResponse(200,updateAvatar,"avatar uploaded successfully"));

})

//updare cover image
const updateUserCoverImage=asyncHandler(async(req,res)=>{
         const coverImageLocalPath=req.file?.path
         if (!coverImageLocalPath) {
             throw new ApiError(400,"uploaded cover image file path unaccessable")
           }
         const coverImage=uploadOnCloud(coverImageLocalPath)
      if (!coverImage.url) {
          throw new ApiError(401,"clodinary upload of cover image failed ")
        }
   const user=req.user
  const public_id=user.coverImage.public_id
  const fileToBeDeleted=public_id;         
  if (!fileToBeDeleted) {                      throw new ApiError(500,"unable to find cover image file")                     }
    const updateCoverImage=  await User.findByIdAndUpdate(
        user?._id,
        {
            set:{
                coverImage:coverImage
              }
          },
        {new:true}
      ).select("-password")

    const fileDeleted=await deleteFromCloud(fileToBeDeleted)
   if (!fileDeleted) {                        throw new ApiError(500,"unable to delete       old cover image file");                         }                                          console.log("cover image file deleted");

    return res
    .status(200)
    .json(new ApiResponse(200,updateCoverImage,"cover image updated successfully "));

})
   const showUserProfile=asyncHandler(async(req,res)=>{
  const {username}=req.params
  if(!username?.trim()){
    throw new ApiError(400,"username is missing")
  }
  const channel =await User.aggregiate([
    {
      $match:{
        userName:username?.toLowerCase()
      }
    },
    {
      $lookup:{
        from:"subscriptions"
        localField:"_id",
        foriegnField:"channel",
        as:"subscribers"
      }
    },
    {
      $lookup:{                                    from:"subscriptions"     
       localField:"_id",        
        foriegnField:"subscriber",                      as:"subscribed"
      }
    },
    {
      $addFieds:{
        subscriberCount:{
          $size:"subscribers"
        },
        channelsSubscribedCount:{
        $size:"subscribed"
      },
        isSubscribed:{
         $cond:{
            if:{$in[req.user?_id,"$subscribed.subscriber"]},
            then:true,
            else:false
          }
       }
      }
    },{
       $project:{
        fullName:1,
        userName:1,
        avatar:1,
        coverImage:1,
        subscriberCount:1,
        channelsSubscribedCount:1,
        isSubscribed:1
      }
    }
  ])
  console.log(channel)
 if (!channel?.length) {
    throw new ApiError(404,"channel does not exist")
 }
  return res
  .status(200)
  .json(new ApiResponse(200,channel.[0],"user profile fetched successfully"))
})

//user watch history 
const getWatchHistory=asyncHandler(async(req,res)=>{
  const user=await User.aggregiate([
      {
      $match:{
        _id:new mongoose.Types.ObjectId(req.user._id)
      } 
    },
    {
      $lookup:{
        from:"videos",
        localField:"watchHistory",
        foreignField:"_id",
        as:"watchHistory",
        pipeline:[
         {
         $lookup:{
              from:"users",
              localField:"owner",
              foreignField:"_id",
              as:"owner"
              pipeline:[
                {
                  $project:{
                    fullName:1,
                    userName:1,
                    avatar:1
                  }
                }
              ]          
           }
          },
            {
             $addFieds:{
              owner:{
              $first:"$owner"
              }
            }
          }
         
        ]
      }
    }
  ])
  return res
  .status(200)
  .json(new ApiResponse(200,user[0].watchHistory,"user watchhistory fetched successfully"))
})


export {registerUser,loginUser,logoutUser,refreshAccessTokens,changePassword,currentUser,updateAccountInfo,updateUserAvatar,updateUserCoverImage,showUserProfile,getWatchHistory}
