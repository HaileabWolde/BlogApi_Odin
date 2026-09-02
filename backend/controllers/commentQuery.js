const db = require("../db/commentDB")

async function newComment(req, res, next){
    const {comment} = req.body
    const {postid} = req.params
    const post_id = parseInt(postid)
    const {id} = req.user
    try{
        const new_comment = await db.createComment(comment,post_id, id)
       return 
    }
    catch(error){
        console.log("Caught Errror:", error)
        next(error)
    }
}

async function fetchAllComment(req, res, next){
    try{
        const allComment = await db.fetchAllComment()
        res.json({
            allComment: allComment
        })
    }
    catch(error){
        console.log("error", error)
        next(error)
    }
}
async function deleteComment(req, res, next){
    const {id} = req.params
    const _id = parseInt(id)
    try{
        await db.deleteComment(_id)
      res.status(200).json({ message: "Comment deleted successfully" })
    }catch(error){
        console.log("error", error)
        next(error)
    }
}
module.exports = {
    newComment,
    fetchAllComment,
    deleteComment
}