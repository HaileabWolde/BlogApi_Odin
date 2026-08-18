
const passport = require('passport')

const verifyAuthor = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Not authorized" })
        }
        
        if (user.role !== 'AUTHOR' && user.role !== 'ADMIN') {
            return res.status(403).json({ message: "Not an author" })
        }
        
        req.user = user
        next()
    })
}

module.exports =  verifyAuthor
