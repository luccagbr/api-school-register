require("dotenv").config();

import * as bodyParser from "body-parser";
import studentRouter from "./routes/students";
import { errorHandler } from "./middlewares/error-handler";
import * as express from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(studentRouter);
app.use(errorHandler);

export default app;
