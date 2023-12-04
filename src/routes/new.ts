import { validateRequest } from "@cwsource/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/api/movies",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("description").not().isEmpty().withMessage("description is required"),
    body("rating").not().isEmpty().withMessage("rating is required"),
    body("image").not().isEmpty().withMessage("image is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, rating, image } = req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        rating,
        image,
      },
    });
    res.status(201).send(movie);
  }
);

export { router as createMovieRouter };
