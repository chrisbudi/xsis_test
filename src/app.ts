import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { errorHandler, NotFoundError } from "@cwsource/common";
import { createMovieRouter } from "./routes/new";
import { showMovieRouter } from "./routes/show";
import { indexMovieRouter } from "./routes";
import { updateMovieRouter } from "./routes/update";
import { deleteMovieRouter } from "./routes/delete";

const app = express();

app.use(json());

app.use(createMovieRouter);
app.use(showMovieRouter);
app.use(indexMovieRouter);
app.use(updateMovieRouter);
app.use(deleteMovieRouter);

//use router
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
