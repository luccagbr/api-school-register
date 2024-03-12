require("dotenv").config();

import express, { Express } from "express";
import bodyParser from "body-parser";
import studentRouter from "./routes/students";
import { errorHandler } from "./middlewares/error-handler";

const app: Express = express();

app.use(studentRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

export default app;
