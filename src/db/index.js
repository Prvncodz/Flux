import mongoose from "mongoose";
import {DB_NAME} from ../constants.js;

const dbConn=(async ()=>{
   try{
   const conn=mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log("mongodb connection successfull");
    console.log(`connection host:${conn.connection.host}`);

} catch(error){
   console.error(`ERROR: ${error}`);
}
}
)()
