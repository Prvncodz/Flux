import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userSchema=new Schema({
     userName:{
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    index:true,
    trim:true
   },
   email:{
   type:String,
   required:true,
   unique:true,
   trim:true
},
   fullName:{
    type:String,
    required:true,
    trim:true
},
   avatar:{
   type:String,// cloudinary url
   required:true
},
  coverImage:{
  type:String
},
  password:{
  type:String,
  required:true
},
  watchHistory:[
 {
 type: Schema.Types.ObjectId,
 ref:"Video"
 }
],
 refreshTokens:{
  type:String
}
},{timestamps:true})

userSchema.pre("save",async function(next){
 if(this.password.isModified){
   this.password=await bcrypt.hash(this.password,10);
}
 return next();
})

userSchema.methods.isPasswordCorrect= async function(password){
 return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessTokens=async function(){
  return await jwt.sign(
      { _id:this._id,
       email:this.email,
       userName:this.username,
      fullName:this.fullName
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
   expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)

}
userSchema.methods.generateRefreshTokens=async function(){
       return await jwt.sign(
      { _id:this._id,
       email:this.email,
       userName:this.username,
      fullName:this.fullName
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
   expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User=mongoose.model("User",userSchema);

