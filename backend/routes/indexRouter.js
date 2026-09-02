const passport = require("passport");
const {Router}  = require("express");


const uploadMiddleware = require("../config/uploadMiddleware.js");
const upload = uploadMiddleware("Haileab");

//
const {signUser, loginUser, signAdminUser, deleteUser} = require("../controllers/userQuery.js")
const {newPost, findallPost, geteachPost,  
    updatePost, deletePost, allPost, getPost} = require("../controllers/postQuery.js")
const {newComment, fetchAllComment, deleteComment} = require("../controllers/commentQuery.js")
const {fetchallTag, fetchSingleTag} = require("../controllers/tagQuery.js")


//authentication
const verifyAuthor = require("../middleware/verifyAuthor.js")




const indexRouter = Router();

//fetch Post
indexRouter.get('/posts/edit/:id', geteachPost)
indexRouter.get('/post/:id', getPost)
indexRouter.get('/posts/allPost', allPost)
indexRouter.get('/posts/all', passport.authenticate('jwt', { session: false }), findallPost)



//fetch tags
indexRouter.get('/tags/alltags', fetchallTag)
indexRouter.get('/tag/:id', fetchSingleTag)


//fetch allcomments,
indexRouter.get('/allcoments', fetchAllComment)

//put
indexRouter.put('/api/posts/edit/:id', verifyAuthor,  upload.single("image"), updatePost)



//delete
indexRouter.delete('/api/posts/delete/:id', verifyAuthor, deletePost)
indexRouter.delete('/user/delete/:id', verifyAuthor, deleteUser)
indexRouter.delete('/comment/delete/:id', deleteComment)

//post
indexRouter.post('/signup/admin', signAdminUser)
indexRouter.post('/signup', signUser)
indexRouter.post("/login",  loginUser)
indexRouter.post('/api/posts/add', verifyAuthor, upload.single("image"), newPost)

indexRouter.post('/post/:postid/comment/add', passport.authenticate('jwt', { session: false }), newComment)
  
module.exports = indexRouter;