const express = require("express");
const { pool } = require("./services/db");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to School API");
});

app.get("/students", (req, res) => {
  pool.connect((err, client, done) => {
    const query = "SELECT * FROM app_db.students";

    client.query(query, (error, result) => {
      done();

      if (error) {
        res.status(400).json(error);
      }

      if (result.rows < "1") {
        res.status(404).send({
          status: "Failed",
          message: "No student information found",
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Students information retrieved",
          students: result.rows,
        });
      }
    });
  });
});

app.post("/student", (req, res) => {
  const data = {
    name: req.body.name,
    age: req.body.age,
    class: req.body.studentClass,
    parents_contact: req.body.parentContact,
    admission_date: req.body.admissionDate,
  };

  pool.connect((err, client, done) => {
    const query = `
        INSERT INTO students(name, age, class, parent_contact, admission_date)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [
      data.name,
      data.age,
      data.class,
      data.parents_contact,
      data.admission_date,
    ];

    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json(error);
      }
      res.status(202).send({
        status: "Succesful",
        result: result.rows[0],
      });
    });
  });
});

app.get("/student/:id", (req, res) => {
  pool.connect((err, client, done) => {
    const query = `SELECT * FROM app_db.student_register WHERE app_db.student_register.id = $1;`;

    const values = [req.params.id || 0];
    client.query(query, values, (error, result) => {
      done();

      if (error) {
        res.status(400).json(error);
      } else if (!result.rows.length) {
        res.status(200).send({
          status: "Succesful",
          result: "Nenhum usuário encontrado!",
        });
      } else {
        res.status(200).send({
          status: "Succesfull",
          result: result.rows[0],
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server listener in port ${port}`);
});
