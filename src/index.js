import dotenv from "dotenv";
import dbConn from "./db/index.js";
import app from "./app.js"
import express from "express"
dbConn
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`app is running at port: ${process.env.PORT}`);
});
  app.on("error",()=>{
   consoe.log("app failed to run !!");
});
})

.catch((err)=>{
   console.log(`mongodb connection failed !!!,error: ${err}`);
})
