import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@cwsource/common";
import express, { Request, Response } from "express";

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
