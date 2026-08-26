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
async function allPost(id){
    const allPost = await prisma.post.findMany({
        where: {
            authorId: id
        }
    })
    return allPost
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
    allPost,
    geteachPost
}