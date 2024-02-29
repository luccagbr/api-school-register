const pg = require("pg");

const config = {
  schema: process.env.DB_SCHEMA,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: "123456",
  port: parseInt(process.env.DB_PORT),
  max: 10,
  idleTimeoutmillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("Connect to the Database");
});

const createTables = () => {
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

  pool
    .query(schoolTable)
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

module.exports = {
  createTables,
  pool,
};

require("make-runnable");
