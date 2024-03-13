import { NextFunction, Request, Response } from "express";
import logger from "../utils/winston-logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).send({ errors: [{ message: err.message }] });
};
