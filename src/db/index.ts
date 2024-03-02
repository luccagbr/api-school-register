import "dotenv/config";

import pg, { Pool, PoolConfig } from "pg";

const config: PoolConfig = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    max: 10,
    idleTimeoutMillis: 30000,
};

export const pool: Pool = new Pool(config);

pool.on("connect", () => {
    console.log("Connect to the Database");
});

export const createTables = () => {
    const schoolTable = `
        CREATE TABLE IF NOT EXISTS
            students(
                id SERIAL PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                age INT NOT NULL,
                class VARCHAR(128) NOT NULL,
                parent_contact VARCHAR(128) NOT NULL,
                admission_date VARCHAR(128) NOT NULL
            );
    `;

    pool.query(schoolTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on("remove", () => {
    console.log("client removed");
    process.exit(0);
});

require("make-runnable");
