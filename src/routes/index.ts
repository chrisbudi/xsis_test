import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/api/movies", async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({});

  res.status(200).send(movies);
});

router.get("/api/movies/byTitle", async (req: Request, res: Response) => {
  const title = req.query.title as string;
  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: title,
      },
    },
  });

  res.status(200).send(movies);
});

export { router as indexMovieRouter };
