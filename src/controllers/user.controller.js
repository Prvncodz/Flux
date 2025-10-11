import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
const  registerUser=asyncHandler(async(req,res)=>{
        // we will get the user info
        // validate the info
       //check is user already exists - username
        // check for images
        // if there is an image for avatar upload to cloudinary
        // make user object and store in db
        // while removing the pass and refreshTokens because we dont want to send them in the response.
        // return res
 const {fullName,userName,email}=req.body
  console.log("email :",email)
if([fullName,userName,email].some((feild) =>feild?.trim()==="")){
  throw new ApiError(400,"All feilds are required");
}
 
  const existsUser=User.findOne({userName});
  if(existsUser)throw new ApiError(402,"user already exists");
  
})

export {registerUser}
