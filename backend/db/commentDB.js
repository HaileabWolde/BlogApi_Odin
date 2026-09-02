
const prisma = require("../lib/prisma")
async function createComment(text, postid, id){
    const new_Comment = await prisma.comment.create({
        data: {
            text: text,
            authorId: id,
            postId: postid
        }
    })
    return new_Comment;

}

async function fetchAllComment(){
    const allComment = await prisma.comment.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            },
            post: true
        }
    })
    return allComment
}
async function deleteComment(id){
    await prisma.comment.delete({
         where: {
                 id: id
        }
    })
    return 
}
module.exports = {
    createComment,
    fetchAllComment,
    deleteComment
}