const prisma = require("../lib/prisma")

async function create_Post(title, allTags, content, id, isPublished, imagePath){
    const new_Post = await prisma.post.create({
        data: {
          title: title,
          content: content,
          authorId: id,
          published: isPublished,
        coverImageUrl: imagePath,
          tags: {
       create: allTags.map(name => ({
        tag: {
            connectOrCreate: {
                where: { name },   // look for existing tag
                create: { name }   // create if not found
            }
        }
    }))
}
        }
    })
    return new_Post
}

async function update_Post(id, title, allTags, content, isPublished, imagePath){
    const updated_Post = await prisma.post.update({
        where: {
            id: id
        },
        data: {
          title: title,
          content: content,
          published: isPublished,
        coverImageUrl: imagePath,
          tags: {
        deleteMany: {},  // ← removes all existing PostTag rows for this post
       create: allTags.map(name => ({
        tag: {
            connectOrCreate: {
                where: { name },   // look for existing tag
                create: { name }   // create if not found
            }
        }
    }))
}
        }
        
    })
    return updated_Post ;
}

async function deletePost(id){
    
    await prisma.postTag.deleteMany({
        where: {
            postId: id
        }
    })
    const deletedPost = await prisma.post.delete({
        where: {
                 id: id
        }
       
    })
    return deletedPost
}

async function allPost(id){
    const allPost = await prisma.post.findMany({
        where: {
            authorId: id
        }
    })
    return allPost
}

async function getPost(id){
    const Post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include:{
            author: {
                select: {
                    username: true
                }
            },
             tags: {
                include: {
                        tag: true, // Hops from the PostTag record to get the final Tag data
                },
            },
            comments:{
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })
    return Post;
}

async function fetchallPost() {
    const Posts = await prisma.post.findMany({
         where: { published: true },
         include: {
            author: {
            select: {
                username: true  // only get what you need
            }
        },
             tags: {
                include: {
                        tag: true, // Hops from the PostTag record to get the final Tag data
                },
            },
    },
    })
    return Posts
    
}

async function geteachPost(id) {
    const post = await prisma.post.findMany({
        where: {
            id: id
        },
         include: {
            tags: {
                include: {
                        tag: true, // Hops from the PostTag record to get the final Tag data
                },
            },
    },
    })
    return post
    
}
module.exports = {
    create_Post,
    update_Post,
    getPost,
    deletePost,
    allPost,
    geteachPost,
    fetchallPost
}