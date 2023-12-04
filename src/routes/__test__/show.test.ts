import request from "supertest";
import { app } from "../../app";
import { v4 as uuid } from "uuid";

it("returns 404 if the movies is not found", async () => {
  const id = uuid();
  await request(app).get(`/api/movies/${id}`).send().expect(404);
});

it("returns the movie if the movie is found", async () => {
  const title = "concert" + uuid();
  const description = "test";
  const response = await request(app)
    .post("/api/movies")
    .send({
      title,
      description: description,
      rating: 1,
      image: "test",
    })
    .expect(201);

  console.log(response.body);
  const movieResponse = await request(app)
    .get(`/api/movie/${response.body.id}`)
    .send()
    .expect(200);

  expect(movieResponse.body.title).toEqual(title);
  expect(movieResponse.body.description).toEqual(description);
});
