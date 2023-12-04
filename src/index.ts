import { app } from "./app";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const start = async () => {
  app.listen(3000, () => {
    console.log("Listening on port 3000 !");
  });
};

start()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
