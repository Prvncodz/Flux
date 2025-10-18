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
   // cloudinary url
   url:{
      type:String,
      required:true
    },
  
   public_id:{
   type:String,
   required:true
  }
},
  coverImage:{
  url:String,
  public_id:String
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
 if(this.isModified("password")){
   this.password=await bcrypt.hash(this.password,10);
   return next();
}else{
 return next();
}
})

userSchema.methods.isPasswordCorrect= async function(password){
 return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessTokens=async function(){
  return await jwt.sign(
      { _id:this._id,
       email:this.email,
       userName:this.userName,
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
       userName:this.userName,
      fullName:this.fullName
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
   expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User=mongoose.model("User",userSchema);

