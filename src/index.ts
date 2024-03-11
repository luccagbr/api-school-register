import { Request, Response } from "express";
import app from "./app";
import { PoolClient, QueryResult } from "pg";
import { pool } from "./db/index";

const port: number = parseInt(process.env.PORT) || 8080;

const initServer = () => {
    app.listen(port, () => {
        console.log(`Server listener in port ${port}`);
    });
};
