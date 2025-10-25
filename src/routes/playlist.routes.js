import { Router } from 'express';
import {
    addVideoToPlaylist,
        createPlaylist,
            deletePlaylist,
                getPlaylistById,
                    getUserPlaylists,
                        removeVideoFromPlaylist,
                            updatePlaylist,
                            } from "../controllers/playlist.controller.js"
import {verifyJwt} from "../middlewares/auth.js"

const router = Router();

router.use(verifyJwt); // Apply verifyJWT middleware to all routes in this file

router.post("/create",createPlaylist)

router.get("/:playlistId",getPlaylistById)
router.patch("/:playlistId",updatePlaylist)
router.delete("/:playlistId",deletePlaylist);

router.patch("/add/:videoId/:playlistId",addVideoToPlaylist)
router.patch("/remove/:videoId/:playlistId",removeVideoFromPlaylist)

router.get("/user/:userId",getUserPlaylists)

export default router

