import request from "supertest";
import { app } from "../../app";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient();

const createMovie = (title: string) => {
  return request(app).post("/api/movies").send({
    title: title,
    description: "test",
    rating: 1,
    image: "test",
  });
};

it("can fetch list of movies", async () => {
  // await createMovie(uuid());
  // await createMovie(uuid());
  // await createMovie(uuid());

  const response = await request(app).get("/api/movies").send().expect(200);

  expect(response.body.length).toBeGreaterThan(0);
});

it("can fetch list of movies by title", async () => {
  const response = await request(app)
    .get("/api/movies/byTitle?title=a")
    .send()
    .expect(200);

  expect(response.body.length).toBeGreaterThan(0);
});
