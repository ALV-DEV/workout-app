import express from "express"
import workoutController from "../controllers/workoutController.js"
import { protect } from "../middleware/authMiddleware.js"
export const workoutRouter = new express.Router()

workoutRouter.post("/", protect, workoutController.addWorkout)
workoutRouter.get("/", protect, workoutController.getAllWorkouts)

workoutRouter.put(
    "/exercises/:id",
    protect,
    workoutController.updateExercisesWorkout
)

workoutRouter.get("/log/:id", protect, workoutController.getWorkoutLog)
workoutRouter.put(
    "/log/:id",
    protect,
    workoutController.updateWorkoutLogComleted
)

workoutRouter.put("/:id", protect, workoutController.updateWorkout)
workoutRouter.get("/:id", protect, workoutController.getWorkout)
workoutRouter.delete("/:id", protect, workoutController.deleteWorkout)

workoutRouter.post("/log", protect, workoutController.createWorkoutLog)
