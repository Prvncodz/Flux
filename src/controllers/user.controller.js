import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {router} from "../routes/user.routes.js"
import {upload} from "../middlewares/multer.js"
import {uploadOnCloud} from "../utils/cloudinary.js"
import {ApiResponse}  from "../utils/ApiResponse.js"

// generate refresh and access tokens for the user
const generateAccessAndRefreshTokens=async(userId){
    try{
	const user=await User.findById(userId)
	const accessTokens=user.generateAccessTokens()
	const refreshTokens=user.generateRefreshTokens()

	user.refreshToken=refreshTokens
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
    coverImage:coverImage?coverImage:" ",
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
    if(!userName || !password){
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
    const {accessTokens,refreshTokens}=	await generateAccessAndRefreshTokens(user._id)
     const loggedUser=await user.findOne(user._id).select("-password -refreshTokens")
     
  const options={
    httpOnly:true,
    secure:true
  }
  
    return res.status(200).cookie("accessTokens",accessTokens,options).cookie("refreshTokens",refreshTokensTokens,options).json( new ApiResponse(200,{user:loggedUser,accessTokens,refreshTokens},"user logged in successfully");

})


export {registerUser,loginUser}
