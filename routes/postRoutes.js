import express from "express";

import { GetExams , AddExams , DeleteExam , UpdateExam , GetuserExams } from "../controllers/exam.controller.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

//Display Examination
router.get("/",GetExams);   


//Display User who Post Exam
router.get("/all", auth , GetuserExams);   

//Post Examinations
router.post("/create",auth , AddExams);


//Delete Examinations
router.delete("/delete/:id", auth ,DeleteExam);


//Update Examinations 
router.put("/update/:id", auth , UpdateExam);


export {router as postRoutes}



    