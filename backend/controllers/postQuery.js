const db = require("../db/postDB")

async function newPost (req, res, next){
       
        const {title, tags, content, published} = req.body
       
        const allTags = tags.trim().toLowerCase().split(",")
       const {id} = req.user

         const isPublished = published === "true" ? true : false;
        
         const imagePath = req.file ? req.file.path : req.body.existingImageUrl || null;
      
    try {
        const post = await db.create_Post(title, allTags, content, id, isPublished, imagePath)
        res.json({
            post: post
        }) 
    }
    catch(error){
        console.log("Caught Error:", error)

        next(error)
    }
}

async function updatePost(req, res, next){
    const {id} = req.params
      const _id = parseInt(id)
    const {title, tags, content, published} = req.body
       
    const allTags = tags.trim().toLowerCase().split(",")

    const isPublished = published === "true" ? true : false;
        
    const imagePath = req.file ? req.file.path : req.body.existingImageUrl || null;

    try{
             const update_post = await db.update_Post(_id, title, allTags, content, isPublished, imagePath)
              res.json({
                     update_post: update_post
                }) 
    }
    catch(error){
         console.log("Caught Error:", error)

        next(error)
    }

}
async function deletePost(req, res, next){
    const {id} = req.params

     const _id = parseInt(id)

    try{
        await db.deletePost(_id)
        res.json({
            message: "deleted successfully"
        })
    }
    catch(error){
        console.log("Caughe Error". error)
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

async function geteachPost(req, res, next){
    const {id} = req.params;
    const _id = parseInt(id)
    try{
        const post = await db.geteachPost(_id)

        res.json({
            post: post
        })
    }
    catch(error){
        console.log("error", error)
        next(error)
    }
}
module.exports = {
    newPost,
    updatePost,
    deletePost,
    findallPost,
    geteachPost,
}