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

module.exports = {
    create_Post
}