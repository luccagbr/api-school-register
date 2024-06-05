import db from "../db/index";

export const getAllStudents = () => {
    try {
    } catch (error) {
        if (error.name === "DuplicateKeyError") {
            throw error;
        }

        throw {
            name: "DatabaseQueryError",
            message: "Error creating student",
            cause: error,
        };
    }
};

interface IStudentProps {
    name: string;
    document_cpf: string;
    birthday_date: number;
    id_class: number;
    id_course: number;
    parent_contact?: string;
    cel_phone?: string;
    admission_date?: string;
}

export const createStudent = async (student: IStudentProps) => {
    try {
        const existClassId = await db.oneOrNone(
            `
                SELECT * 
                FROM class
                WHERE id = $1 AND id_course = $2;
            `,
            [student.id_class, student.id_course],
        );

        if (!existClassId) {
            throw {
                name: "DatabaseQueryError",
                message: "Class by id not found",
                status: false,
            };
        }

        const existStudentByCpf: any = await db.oneOrNone(
            `
                SELECT * 
                FROM people
                WHERE document_cpf = $1
                LEFT JOIN people.student st ON people.id = st.id AND st.class = $2;
            `,
            [student.document_cpf, student.id_class],
        );

        let copyPeople: any = {};

        if (existStudentByCpf) {
            if (existStudentByCpf.student) {
                throw {
                    name: "DatabaseQueryError",
                    message: "The student is already linked to the class",
                    status: false,
                };
            }

            copyPeople = { ...existStudentByCpf };
        } else {
            copyPeople = await db.one(
                `
                INSERT INTO people
                    (name, document_cpf, birthday_date, cel_phone, parent_contact)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *;
                `,
                [student.name, student.document_cpf, student.birthday_date, student.cel_phone, student.parent_contact],
            );
        }

        const createStudent = await db.one(
            `
            INSERT INTO student 
                (id_people, id_class, admission_date)
                    VALUES ($1, $2, $3)
                    RETURNING *;
        `,
            [copyPeople.id, student.id_class, student.admission_date],
        );

        return {
            message: "Student created successfully",
            status: true,
            student: {
                id: createStudent.id,
                created_at: createStudent.created_at,
            },
        };
    } catch (error) {
        if (error.name === "DuplicateKeyError") {
            throw error;
        }
        throw {
            name: "DatabaseQueryError",
            message: "Error creating student",
            cause: error,
        };
    }
};
