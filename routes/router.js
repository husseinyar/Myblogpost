
import express from "express";
const router = express.Router();
import  login  from "../controllers/auth.js"; 
import register from "../controllers/userRegster.js"
import { getFeedPosts, getUserPosts, likePost ,createPost } from "../controllers/posts.js";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
  } from "../controllers/users.js";
  import { verifyToken } from "../middleware/auth.js";
import upload from "../multerconfig.js"
router.post("/auth/register", upload.single("picture"), register);
router.post("/posts", verifyToken, upload.single("picture"), createPost);
router.get("/auth/login",  login);
/* post */
router.get("/posts", verifyToken, getFeedPosts);
router.get("/posts/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/posts/:id/like", verifyToken, likePost);
router.post("/posts/posts", verifyToken, upload.single("picture"), createPost);
/* end */
/* user */
router.get("/users/:id", verifyToken, getUser);
router.get("/users/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/users/:id/:friendId", verifyToken, addRemoveFriend);

export default router;