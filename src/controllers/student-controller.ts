import { NextFunction, Request, Response } from "express";
import * as studentModel from "../models/app-model";

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentModel.getAllStudents();
    } catch (error) {
        next(error);
    }
};

export const getStudentById = (req: Request, res: Response) => {
    // pool.connect((err: Error, client: PoolClient, done: (release?: any) => void) => {
    //     const query = `SELECT * FROM students WHERE students.id = $1;`;
    //     const values: any = [req.params.id || 0];
    //     client.query(query, values, (error: Error, result: QueryResult<any>) => {
    //         done();
    //         if (error) {
    //             res.status(400).json(error);
    //         } else if (!result.rows.length) {
    //             res.status(200).send({
    //                 status: "Successful",
    //                 result: "Nenhum usuário encontrado!",
    //             });
    //         } else {
    //             res.status(200).send({
    //                 status: "Successfull",
    //                 result: result.rows[0],
    //             });
    //         }
    //     });
    // });
};

export const createNewStudent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const data = {
            name: req.body.name,
            document_cpf: req.body.document_cpf,
            birthday_date: req.body.birthday_date,
            id_class: req.body.id_class,
            id_course: req.body.id_course,
            cel_phone: req.body.cel_phone,
            parent_contact: req.body.parent_contact,
            admission_date: req.body.admission_date,
        };

        if (!data.name) {
            throw new Error("Nome do aluno é obrigatório!");
        }

        if (data.document_cpf) {
            throw new Error("Cpf do aluno é obrigatório!");
        }

        if (!data.birthday_date) {
            throw new Error("Idade do aluno é obrigatória!");
        }

        const createdStudent = await studentModel.createStudent(data);
        res.status(201).send(createdStudent);
    } catch (error) {
        next(error);
    }
};
