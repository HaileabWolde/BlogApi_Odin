const prisma = require('./lib/prisma');

async function main() {
  //await prisma.post.deleteMany()
  await prisma.postTag.deleteMany()
   await prisma.post.deleteMany()
   
  // await prisma.user.deleteMany()
   
   await prisma.tag.deleteMany()
  // Create a new user with a post
  /*
  const user = await prisma.user.create({
    data: {
      username: "woma",
      password: "1428",
    },
  });
  console.log("Created user:", user);*/  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });