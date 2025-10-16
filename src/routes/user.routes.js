import {Router} from "express"
import {registerUser,loginUser,logoutUser,refreshAccessTokens,changePassword,currentUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.js"
import { verifyJwt } from "../middlewares/auth.js"

const router=Router();
router.post("/register"
,upload.fields([
       {name:"avatar",maxCount:1},
 	{name:"coverImage",maxCount:1},
   	     ] ),registerUser);

router.post("/login",loginUser);

//secured routes
router.post("/logout",verifyJwt,logoutUser);
router.post("/refreshTokens",refreshAccessTokens)
router.post("/changePassword",verifyJwt,changePassword)
router.get("/currentUser",verifyJwt,currentUser)
export default router ;
