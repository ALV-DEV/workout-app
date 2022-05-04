import express from "express"
import userController from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
export const userRouter = new express.Router()

userRouter.get("/profile", protect, userController.getProfile)

userRouter.post("/", userController.registerUser)
userRouter.post("/login", userController.loginUser)
