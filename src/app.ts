require("dotenv").config();

import * as bodyParser from "body-parser";
import { errorHandler } from "./middlewares/error-handler";
import * as express from "express";
import studentRouter from "./routes/student";
import * as cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(studentRouter);
app.use(errorHandler);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send({ status: "Rota não encontrada." });
    next();
});

export default app;
