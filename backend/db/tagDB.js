const prisma = require("../lib/prisma");

async function allTags(){
    const alltags = await prisma.tag.findMany({
        include: {
            posts: {
                include: {
                    post: {
                       include: {
                        author: {
                            select: {
                                username: true
                            }
                        }
                       }
                    }
                }
            }
        }
    })
    return alltags

}

async function fetchSingleTag(id){
    const tag = await prisma.tag.findUnique({
        where: {
            id: id
        },
        include: {
            posts: {
                include: {
                    post: {
                       include: {
                        author: {
                            select: {
                                username: true
                            }
                        }
                       }
                    }
                }
            }
        }
    })
    return tag;
}
module.exports = {
    allTags,
    fetchSingleTag
}