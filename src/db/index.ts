import "dotenv/config";

import pgPromise from "pg-promise";
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

// db.on("connect", () => {
//     console.log("Connect to the Database");
// });

// export const createTables = () => {
//     const schoolTable = `
//         CREATE TABLE IF NOT EXISTS
//             students(
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(128) NOT NULL,
//                 age INT NOT NULL,
//                 class VARCHAR(128) NOT NULL,
//                 parent_contact VARCHAR(128) NOT NULL,
//                 admission_date VARCHAR(128) NOT NULL
//             );
//     `;

//     db.query(schoolTable)
//         .then((res) => {
//             console.log(res);
//             db.end();
//         })
//         .catch((err) => {
//             console.log(err);
//             db.end();
//         });
// };

// db.on("remove", () => {
//     console.log("client removed");
//     process.exit(0);
// });

require("make-runnable");
