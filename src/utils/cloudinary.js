import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
 cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
 api_key:process.env.CLOUDINARY_API_KEY,
 api_secret:process.env.CLOUDINARY_API_SECRET,
});
console.log("env check KEY AND SECRET of cloud:",process.env.CLOUDINARY_API_KEY,"SEC:",process.env.CLOUDINARY_API_SECRET)
//method to upload on cloudinary

const uploadOnCloud=async (filePath)=>{
  try{
  if(!filePath)return null;
  const response= await cloudinary.uploader.upload(filePath,{
                  resource_type:"auto"
})

  console.log("File uploaded to cloudinary")
 fs.unlinkSync(filePath)
 return response.secure_url;
	}
   catch(error){
   fs.unlinkSync(filePath)
     console.log("the catch in cloudinary is triggered") 
return null;
  	}
}

export {uploadOnCloud}
