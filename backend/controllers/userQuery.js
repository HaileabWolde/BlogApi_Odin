const passport = require("passport");
const bcrypt = require('bcryptjs')
const db = require("../db/userDB.js")
const utils = require('../lib/utils.js')
const AppError = require('../appError/AppError.js');
const { Prisma } = require("../generated/prisma/index.js");
async function signUser (req, res, next){
    const {username, password} = req.body
    try {
        const user = await db.createUser(username, password)
        res.json({success:true, user: user})
    }
    catch(error){
       console.log("Caught error:", error);
  if (error.code === "P2002") {
    return next(new AppError("Username already taken", 409));
  }

  next(error);
    }

}

async function signAdminUser(req, res, next) {
  const { username, password } = req.body;
  const role = "ADMIN";

  try {
    const adminUser = await db.createUser(username, password, role);
    res.json({ success: true, user: adminUser });
  } catch (error) {
  // This is the most reliable way
  if (error.code === "P2002") {
    return next(new AppError("Username already taken", 409));
  }

  next(error);
  }
}
async function loginUser(req, res, next){
    const {username, password} = req.body
    try{
        const user = await db.findUser(username)
        if(!user){
                throw new AppError(`couldn't find user`, 404)
                }
         const match = await bcrypt.compare(password, user.password)
         if (!match) {
            throw new AppError("Invalid username or password", 401)
        }
        
        const tokenObject = utils.issueJWT(user)
        
        res.status(200).json({ 
            success: true, 
            token: tokenObject.token, 
            expiresIn: tokenObject.expires 
        })
    }
    catch(error){
        console.log('error', error)
        next(error)
    }
}
module.exports= {
    signUser,
     loginUser,
     signAdminUser
}