import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {router} from "../routes/user.routes.js"
import {upload} from "../middlewares/multer.js"
import {uploadOnCloud} from "../utils/cloudinary.js"

const  registerUser=asyncHandler(async(req,res)=>{
        // we will get the user info
        // validate the info
       //check is user already exists - username
        // check for images
        // if there is an image for avatar upload to cloudinary
        // make user object and store in db
        // while removing the pass and refreshTokens because we dont want to send them in the response.
        // return res

 const {fullName,userName,password,email}=req.body


if([fullName,userName,email].some((feild) =>feild?.trim()==="")){
  throw new ApiError(400,"All feilds are required");
}
  //we should await before interacting with the db
  const existsUser=await User.findOne({userName});
  if(existsUser){
throw new ApiError(402,"user already exists");
}

  const avatarLocalPath=req.files?.avatar?.[0]?.path;
 const coverImageLocalPath=req.files?.coverImage?.[0]?.path;
  console.log(req.files);
  console.log(req.files?.avatar[0]); 
  console.log("avatar local path :",avatarLocalPath);
 
if(!avatarLocalPath){
   throw new ApiError(403,"avatar is required to register");
}
   // we should use await while the file get uploaded to the cloud from the local path
   const avatar= await uploadOnCloud(avatarLocalPath)
   console.log("avatar check :",avatar);
  const coverImage=await uploadOnCloud(coverImageLocalPath);
   if(!avatar){
 throw new ApiError(403,"avatar is required to register");
}

 const user=User.create({
    userName:userName.toLowerCase(),
    fullName,
    email,
    avatar:avatar,
    coverImage:coverImage?coverImage:" ",
    password
})
   const createdUser=User.findById(user._id).select(" -password -refreshTokens")
   if(!createdUser){
   throw new ApiError(500,"Unable to register user")
   }
    return res.status(200).json(ApiResponse(203,createdUser,"User registered successfully"))
})

export {registerUser}
