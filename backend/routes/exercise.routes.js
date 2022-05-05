import express from "express"
import exerciseController from "../controllers/exerciseController.js"
import { protect } from "../middleware/authMiddleware.js"
export const exerciseRouter = new express.Router()

exerciseRouter.post("/", protect, exerciseController.addExercise)
exerciseRouter.get("/", protect, exerciseController.getAllExercises)

exerciseRouter.post("/log", protect, exerciseController.createExerciseLog)
exerciseRouter.get("/log/:id", protect, exerciseController.getExerciseLog)
exerciseRouter.put(
    "/log/complete/:id",
    protect,
    exerciseController.updateCompleteExerciseLog
)
exerciseRouter.put("/log/:id", protect, exerciseController.updateExerciseLog)
exerciseRouter.put("/:id", protect, exerciseController.updateExercise)
exerciseRouter.delete("/:id", protect, exerciseController.deleteExercise)
