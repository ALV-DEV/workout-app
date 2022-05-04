import express from "express"
import workoutController from "../controllers/workoutController.js"
import { protect } from "../middleware/authMiddleware.js"
export const workoutRouter = new express.Router()

workoutRouter.post("/", protect, workoutController.addWorkout)
workoutRouter.get("/:id", protect, workoutController.getWorkout)
