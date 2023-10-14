

import express from "express";
const  router = express.Router();
import  {login, register} from  "../Controllers/auth.js"; 

import { getFeedPosts, getUserPosts, likePost ,createPost }from "../Controllers/posts.js";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
  } from "../Controllers/users.js";
  import { verifyToken } from "../middleware/auth.js" ;


router.post("/auth/login", login);
/* post */
router.get("/posts", verifyToken, getFeedPosts);
router.get("/posts/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/posts/:id/like", verifyToken, likePost);

/* end */
/* user */
router.get("/users/:id", verifyToken, getUser);
router.get("/users/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/users/:id/:friendId", verifyToken, addRemoveFriend);


export default router;