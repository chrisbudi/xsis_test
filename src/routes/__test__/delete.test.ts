import request from "supertest";
import { app } from "../../app";
import { v4 as uuid } from "uuid";

it("delete the movie", async () => {
  const title = uuid();
  const res = await request(app).post(`/api/movies`).send({
    title,
    description: "test",
    rating: 1,
    image: "test",
  });

  await request(app).delete(`/api/movie/${res.body.id}`).send({});

  const movieResponse = await request(app)
    .get(`/api/movie/${res.body.id}`)
    .send({});

  expect(movieResponse.body.errors).not.toBe(undefined);
});
