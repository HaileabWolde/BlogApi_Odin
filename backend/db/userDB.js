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
module.exports = {
    createUser,
    findUser
}