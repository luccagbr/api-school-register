import { Request, Response } from "express";
import { Router } from "express";
import logger from "../utils/winston-logger";
import { formatDateOrDateAndTime } from "../utils/formattings";
import { createNewStudent, getAllStudents, getStudentById } from "src/controllers/student-controller";
const router = Router();

const welcomeApi = (req: Request, res: Response) => {
    logger.info(`The api has been accessed in ${formatDateOrDateAndTime(new Date(), true)} `);
    res.send("Welcome to API");
};

router.get("/", welcomeApi);
router.get("/student/all-students", getAllStudents);
router.get("/student/:id", getStudentById);
router.post("/student", createNewStudent);

export default router;
