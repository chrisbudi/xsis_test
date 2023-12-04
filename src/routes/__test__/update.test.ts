import request from "supertest";
import { app } from "../../app";
import { v4 as uuid } from "uuid";

it("update the movie", async () => {
  const title = uuid();
  const res = await request(app).post(`/api/movies`).send({
    title,
    description: "test",
    rating: 1,
    image: "test",
  });

  const newTitle = "new title " + uuid();
  await request(app)
    .put(`/api/movie/${res.body.id}`)
    .send({
      title: newTitle,
      description: "test",
      rating: 1,
      image: "test",
    })
    .expect(200);

  const movieResponse = await request(app)
    .get(`/api/movie/${res.body.id}`)
    .send({});

  expect(movieResponse.body.title).toEqual(newTitle);
});
