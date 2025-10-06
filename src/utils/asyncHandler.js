const asyncHandler= (fnc)=> async(res,req,next)=>{
   try{
     await fnc(res,req,next);
   }
   catch(err){
    res.status(err.code||500).json({
    success:false,
    message:err.message
   })
   }
}
export {asyncHandler};
