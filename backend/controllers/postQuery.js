const db = require("../db/postDB")
async function newPost (req, res, next){
       
        const {title, tags, content, isPublished} = req.body
        const allTags = tags.trim().toLowerCase().split(",")
       const {id} = req.user
      
    try {
        const post = await db.create_Post(title, allTags, content, id, isPublished)
        console.log(post) 
    }
    catch(error){
        console.log("Caught Error:", error)
        next(error)
    }
}
module.exports = {
    newPost
}