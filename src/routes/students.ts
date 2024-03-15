import { Request, Response } from "express";
import { PoolClient, QueryResult } from "pg";
import { Router } from "express";
import { pool } from "../db/index";
import logger from "../utils/winston-logger";
import { formatDateOrDateAndTime } from "src/utils/formattings";
const router = Router();

const welcomeApi = (req: Request, res: Response) => {
    logger.info(`The api has been accessed in ${formatDateOrDateAndTime(new Date(), true)} `);
    res.send("Welcome to API");
};

const getAllStudents = (req: Request, res: Response) => {
    pool.connect((err: Error, client: PoolClient, done: (release?: any) => void) => {
        const query: string = "SELECT * FROM students;";

        client.query(query, (error: Error, result: QueryResult<any>) => {
            done();

            if (error) {
                throw new Error(`${error}`);
            }

            if (result.rows && result.rows.length < 1) {
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
};

const getStudentById = (req: Request, res: Response) => {
    pool.connect((err: Error, client: PoolClient, done: (release?: any) => void) => {
        const query = `SELECT * FROM students WHERE students.id = $1;`;

        const values = [req.params.id || 0];
        client.query(query, values, (error: Error, result: QueryResult<any>) => {
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
};

const createNewStudent = (req: Request, res: Response) => {
    const data = {
        name: req.body.name,
        age: req.body.age,
        class: req.body.studentClass,
        parents_contact: req.body.parentContact,
        admission_date: req.body.admissionDate,
    };

    if (!data.name) {
        throw new Error("Nome do aluno é obrigatório!");
    }

    if (!data.age) {
        throw new Error("Idade do aluno é obrigatória!");
    }

    if (!data.class) {
        throw new Error("Sala do aluno é obrigatória!");
    }

    if (!data.admission_date) {
        throw new Error("Data de inscrição do aluno é obrigatória!");
    }

    pool.connect((err: Error, client: PoolClient, done: (release?: any) => void) => {
        const query = `
        INSERT INTO students(name, age, class, parent_contact, admission_date)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const values = [data.name, data.age, data.class, data.parents_contact, data.admission_date];

        client.query(query, values, (error: Error, result: QueryResult<any>) => {
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
};

router.get("/", welcomeApi);
router.get("/student/:id", getStudentById);
router.get("/student/all-students", getAllStudents);
router.post("/student", createNewStudent);

export default router;
