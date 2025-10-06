import mongoose,{Schema} from mongoose;

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
  watchHistory;[
 {
 type: Schema.Types.ObjectId,
 ref:"Video"
 }
],
 refreshTokens:{
  type:String
}
},{timestamps:true})
export const User=mongoose.model("User",userSchema);

