const passport = require("passport");
const db = require("../db/userDB.js")
const utils = require('../lib/utils.js')
const AppError = require('../appError/AppError.js');
async function signUser (req, res, next){
    const {username, password} = req.body
    try {
        const user = await db.createUser(username, password)
        res.json({success:true, user: user})
    }
    catch(error){
        console.log('error', error)
        next(error)
    }

}
async function loginUser(req, res, next){
    const {username, password} = req.body
    try{
        const user = await db.findUser(username)
        if(!user){
                throw new AppError(`couldn't find user`, 404)
                }
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
     loginUser
}