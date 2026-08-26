const passport = require("passport");
const {Router}  = require("express");
const multer = require("multer")

const uploadMiddleware = require("../config/uploadMiddleware.js");
const upload = uploadMiddleware("Haileab");

//
const {signUser, loginUser, signAdminUser} = require("../controllers/userQuery.js")
const {newPost, findallPost, geteachPost,  updatePost, deletePost} = require("../controllers/postQuery.js")


//authentication
const verifyAuthor = require("../middleware/verifyAuthor.js")




const indexRouter = Router();

indexRouter.get('/', (req, res)=> {
    res.json("Fuck u bitch us nigga")
})

indexRouter.get('/admindashboard', verifyAuthor, (req, res)=> {
    res.json({
        success: true,
        msg: "fuck u have made it"
    })
})
indexRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!", user: req.user});
});
indexRouter.get('/posts/edit/:id', geteachPost)
indexRouter.get('/posts/all', passport.authenticate('jwt', { session: false }), findallPost)


//put
indexRouter.put('/api/posts/edit/:id', passport.authenticate('jwt', {session:false}),  upload.single("image"), updatePost)



//delete
indexRouter.delete('/api/posts/delete/:id', passport.authenticate('jwt', {session: false}), deletePost)

//post
indexRouter.post('/signup/admin', signAdminUser)
indexRouter.post('/signup', signUser)
indexRouter.post("/login",  loginUser)
indexRouter.post('/api/posts/add', passport.authenticate('jwt', {session:false}), upload.single("image"), newPost)


  
module.exports = indexRouter;