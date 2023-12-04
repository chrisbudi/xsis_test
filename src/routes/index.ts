import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/api/movies", async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({});

  res.status(200).send(movies);
});

export { router as indexMovieRouter };
