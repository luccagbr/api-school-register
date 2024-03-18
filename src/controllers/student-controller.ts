import { Request, Response } from "express";
import { PoolClient, QueryResult } from "pg";
import { pool } from "../db/index";

export const getAllStudents = (req: Request, res: Response) => {
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

export const getStudentById = (req: Request, res: Response) => {
    pool.connect((err: Error, client: PoolClient, done: (release?: any) => void) => {
        const query = `SELECT * FROM students WHERE students.id = $1;`;

        const values = [req.params.id || 0];
        client.query(query, values, (error: Error, result: QueryResult<any>) => {
            done();

            if (error) {
                res.status(400).json(error);
            } else if (!result.rows.length) {
                res.status(200).send({
                    status: "Successful",
                    result: "Nenhum usuário encontrado!",
                });
            } else {
                res.status(200).send({
                    status: "Successfull",
                    result: result.rows[0],
                });
            }
        });
    });
};

export const createNewStudent = (req: Request, res: Response) => {
    const data = {
        name: req.body.name,
        age: req.body.age,
        class: req.body.student_class,
        parents_contact: req.body.parent_contact,
        admission_date: req.body.admission_date,
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
