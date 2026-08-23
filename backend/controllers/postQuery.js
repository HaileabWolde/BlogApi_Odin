const db = require("../db/postDB")
const { post } = require("../lib/prisma")
async function newPost (req, res, next){
       
        const {title, tags, content, published} = req.body
        console.log(published)
        const allTags = tags.trim().toLowerCase().split(",")
       const {id} = req.user

         const isPublished = published === "true" ? true : false;
         
         const imagePath = req.file ? `${req.file.filename}` : null;
      
    try {
        const post = await db.create_Post(title, allTags, content, id, isPublished, imagePath)
        console.log(post) 
    }
    catch(error){
        console.log("Caught Error:", error)

        next(error)
    }
}
async function findallPost(req, res, next){
    const {id} = req.user
    try{
        const allPost = await db.allPost(id)
        const publishedPost = allPost.filter((post)=> post.published === true)
        const draftPost = allPost.filter((post)=> post.published != true)

        
        res.json({
            allPost: allPost,
            publishedPost: publishedPost,
            draftPost: draftPost
        })
    }
    catch(error){
        console.log("error", error)
        next(error)
    }
}
module.exports = {
    newPost,
    findallPost
}