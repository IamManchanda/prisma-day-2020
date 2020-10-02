import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.create({
    data: {
      name: "Diary",
    },
  });
  const result = await prisma.categoryToPost.create({
    data: {
      Category: {
        connect: { id: cat.id },
      },
      Post: {
        connect: { id: 1 },
      },
      User: {
        connect: { email: "alice@prisma.io" },
      },
    },
  });
  console.log(result);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
