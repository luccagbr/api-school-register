require("dotenv").config();

import express, { Express } from "express";
import bodyParser from "body-parser";
import router from "./routes/index";

const app: Express = express();

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
