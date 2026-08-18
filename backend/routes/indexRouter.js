const passport = require("passport");
const {Router}  = require("express");
const {signUser, loginUser} = require("../controllers/userQuery.js")
const utils = require('../lib/utils.js');
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
indexRouter.post('/signup', signUser)
indexRouter.post("/login",  loginUser)


  
module.exports = indexRouter;