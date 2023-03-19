

const express = require("express")
const  router = express.Router();
const  {login, register} = require( "../Controllers/auth.js"); 

const { getFeedPosts, getUserPosts, likePost ,createPost }= require("../Controllers/posts.js") ;
const {
    getUser,
    getUserFriends,
    addRemoveFriend,
  } =require("../Controllers/users.js");
  const { verifyToken } = require("../middleware/auth.js") ;
const upload =require("../multerconfig.js");
router.post("/auth/register", upload.single("picture"), register);
router.post("/posts", verifyToken, upload.single("picture"), createPost);
router.post("/auth/login", login);
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


module.exports = router;