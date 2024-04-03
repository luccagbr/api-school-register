import "dotenv/config";

import * as pgPromise from "pg-promise";
import { IClient, IConnectionParameters } from "pg-promise/typescript/pg-subset";

const pg = pgPromise();

const config: string | IConnectionParameters<IClient> = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
    max: 10,
    idleTimeoutMillis: 30000,
};

const db = pg(config);

async function testDatabaseConnection() {
    try {
        const result = await db.one("SELECT NOW()");
        console.log("Connect to the database: " + result.now);
    } catch (error) {
        throw new Error("Error connecting to the database");
    }
}

testDatabaseConnection();

export default db;

require("make-runnable");
