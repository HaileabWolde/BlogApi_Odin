const bcrypt = require("bcryptjs");
const  prisma  = require("../lib/prisma.js");



async function createUser(username, password, role){
    const adminrole = role ? role : 'USER'
     const hashedPassword = await bcrypt.hash(password,  10);
     const user = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            role: adminrole
        }
     })
     return user
}

async function findUser(username){

 const user = await prisma.user.findUnique({
            where: {
                username: username
            }
})
 return user
}

async function deleteUser(id){
    await prisma.post.deleteMany({
         where: {
            authorId: id
        }
    })
    await prisma.comment.deleteMany({
        where: {
             authorId: id
        }
    })
    await prisma.user.delete({
         where: {
                 id: id
        }
    })
    return 
}
module.exports = {
    createUser,
    findUser,
    deleteUser
}