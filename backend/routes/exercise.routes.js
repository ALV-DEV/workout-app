import express from "express"
import exerciseController from "../controllers/exerciseController.js"
import { protect } from "../middleware/authMiddleware.js"
export const exerciseRouter = new express.Router()

exerciseRouter.post("/", protect, exerciseController.addExercise)
exerciseRouter.post("/log", protect, exerciseController.createExerciseLog)
