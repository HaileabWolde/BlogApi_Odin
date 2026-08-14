const {Router}  = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const  prisma  = require("../lib/prisma.js");
const utils = require('../lib/utils.js');

const indexRouter = Router();

indexRouter.get('/', (req, res)=> {
    res.json("Fuck u bitch us nigga")
})

indexRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!", user: req.user});
});
indexRouter.post('/signup', async function(req, res, next){
      // Use req.body directly instead of matchedData
    const { username, password } = req.body;
    try{
         const hashedPassword = await bcrypt.hash(password,  10);
         const user = await prisma.user.create({
              data: {
                      username: username,
                     password: hashedPassword
                    }
        }); 
        res.json({ success: true, user: user });
    }
    catch(error){
          console.log('error', error)
        res.json({ success: false, msg: err });
    }
})
indexRouter.post("/login", async function (req, res, next) {
     // Use req.body directly instead of matchedData
    const { username, password } = req.body;
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if(!user){
              return res.status(401).json({ success: false, msg: "could not find user" });
        }
         const match = await bcrypt.compare(password, user.password);
          if(!match){
              res.status(401).json({ success: false, msg: "you entered the wrong password" });
         }
         else{
             const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
         }


    }
    catch(error){
        console.log('error', error)
        res.json({ success: false, msg: err });
    }
})


  
module.exports = indexRouter;