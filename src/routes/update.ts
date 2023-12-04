import { validateRequest } from "../middleware/validate-request";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const prisma = new PrismaClient();

const router = express.Router();

router.put(
  "/api/movie/:id",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("description").not().isEmpty().withMessage("description is required"),
    body("rating").not().isEmpty().withMessage("rating is required"),
    body("image").not().isEmpty().withMessage("image is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const movie = await prisma.movie.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!movie) {
      throw new NotFoundError();
    }

    const { title, description, rating, image } = req.body;

    const updatedmovie = await prisma.movie.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title,
        description,
        rating,
        image,
        updatedAt: new Date(),
      },
    });

    res.send(updatedmovie);
  }
);

export { router as updateMovieRouter };
