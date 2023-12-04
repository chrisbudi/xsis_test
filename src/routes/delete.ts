import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";

const prisma = new PrismaClient();

const router = express.Router();

router.delete("/api/movie/:id", async (req: Request, res: Response) => {
  const movie = await prisma.movie.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });

  console.log(movie, "movie");

  if (!movie) {
    throw new NotFoundError();
  }

  const deletedMovie = await prisma.movie.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).send(deletedMovie);
});

export { router as deleteMovieRouter };
