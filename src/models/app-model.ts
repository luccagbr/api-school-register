import db from "../db/index";

const createPeopleTable = async () => {
    try {
        const createPeopleTable = await db.none(
            `
                CREATE TABLE IF NOT EXISTS
                    people(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(128) NOT NULL,
                        document_cpf VARCHAR(11) NOT NULL, 
                        birthday_date DATE NOT NULL,
                        cel_phone BIGINT,
                        parent_contact BIGINT,
                        created_at TIMESTAMP DEFAULT now(),
                        updated_at TIMESTAMP 
                    )
            `,
        );
        console.log("sucess1");
        return { message: "People table created successfully", status: true };
    } catch (error) {
        console.log(error, 44);
        throw {
            name: "TableCreationError",
            message: "Error creating people table",
            cause: error,
        };
    }
};

const createCourseTable = async () => {
    try {
        const createCoursetable = await db.none(
            `
                CREATE TABLE IF NOT EXISTS
                    course(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(128) NOT NULL,
                        is_active BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMP DEFAULT now(),
                        updated_at TIMESTAMP
                    )
            `,
        );
        console.log("success2");
        return { message: "Course table created successfully", status: true };
    } catch (error) {
        console.log(error, 44);
        throw {
            name: "TableCreationError",
            message: "Error creating course table",
            cause: error,
        };
    }
};

const createClassTable = async () => {
    try {
        const createClassTable = await db.none(
            `
                CREATE TABLE IF NOT EXISTS
                    class(
                        id SERIAL PRIMARY KEY,
                        id_course INTEGER NOT NULL,
                        name VARCHAR(128) NOT NULL,
                        is_active BOOLEAN DEFAULT true,
                        created_at TIMESTAMP DEFAULT now(),
                        updated_at TIMESTAMP,
                        CONSTRAINT fk_class_course
                            FOREIGN KEY(id_course)
                                REFERENCES course(id)
                                ON DELETE NO ACTION
                                ON UPDATE CASCADE
                    )
            `,
        );
        console.log("success3");
        return { message: "Class table created successfully", status: true };
    } catch (error) {
        console.log(error, 44);
        throw {
            name: "TableCreationError",
            message: "Error creating class table",
            cause: error,
        };
    }
};

const createStudentTable = async () => {
    try {
        const createStudentTable = await db.none(
            `
            CREATE TABLE IF NOT EXISTS
                student(
                    id SERIAL PRIMARY KEY,
                    id_people INTEGER NOT NULL
                    id_class INTEGER NOT NULL,
                    admission_date DATE NOT NULL,
                    is_active BOOLEAN DEFAULT true,
                    created_at TIMESTAMP DEFAULT now(),
                    updated_at TIMESTAMP,
                    CONSTRAINT fk_people_student
                        FOREIGN KEY(id_people)
                            REFERENCES people(id)
                            ON DELETE NO ACTION
                            ON UPDATE CASCADE
                    CONSTRAINT fk_student_class
                        FOREIGN KEY(id_class)
                            REFERENCES class(id)
                            ON DELETE NO ACTION
                            ON UPDATE CASCADE
                    );
            `,
        );
        console.log("success4");
        return { message: "Student table created successfully", status: true };
    } catch (error) {
        console.log(error, 44);
        throw {
            name: "TableCreationError",
            message: "Error creating student table",
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
