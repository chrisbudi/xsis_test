import { NotFoundError } from "../errors/not-found-error";
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/api/movie/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const movie = await prisma.movie.findFirst({
    where: {
      id: id,
    },
  });
  if (!movie) {
    throw new NotFoundError();
  }

  res.status(200).send(movie);
});

export { router as showMovieRouter };
