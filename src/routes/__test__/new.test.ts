import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

it("has a route handler listening to /api/movies to post a request", async () => {
  const response = await request(app).post("/api/movies").send({});

  expect(response.status).not.toEqual(404);
});

it("create a movie with valid inputs", async () => {
  const title = uuid();
  await request(app).post("/api/movies").send({
    title,
    description: "test",
    rating: 1,
    image: "test",
  });

  let movies = await prisma.movie.findFirst({ where: { title: title } });
  console.log(movies);
  expect(movies?.title).toEqual(title);
});
