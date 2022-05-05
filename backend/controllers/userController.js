import { generateToken } from "../helpers/generateToken.js"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import ExerciseLog from "../models/exreciseLogModel.js"
import WorkoutLog from "../models/workoutLogModel.js"

class UserController {
    // @desc   Get user profile
    // @route  GET /api/users/profile
    // @access Private
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user._id)
                .select("-password")
                .lean()
            const exerciseLogByUser = await ExerciseLog.find({
                user: user._id,
                comleted: true,
            })
            let countExerciseTimesCompleted = 0
            let times = []
            let kgs = 0
            exerciseLogByUser.forEach((log) => {
                countExerciseTimesCompleted += log.times.length
                times.push(...log.times)
            })
            times.forEach((item) => {
                kgs += item.weight
            })

            const minutes = Math.ceil(countExerciseTimesCompleted * 2.3)
            const wokrkouts = await WorkoutLog.find({
                user: user._id,
                comleted: true,
            }).countDocuments()
            return res.json({ ...user, minutes, wokrkouts, kgs })
        } catch (error) {
            console.log(error)
        }
    }

    // @desc   Register user
    // @route  POST /api/users
    // @access Public
    async registerUser(req, res) {
        try {
            const { email } = req.body
            const isHaveUser = await User.findOne({ email })
            if (isHaveUser) {
                res.status(400)
                throw new Error("This email is busy")
            }
            const user = await User.create({
                email,
                password: req.body.password,
            })
            const token = generateToken(user._id)
            const { password, ...info } = user._doc
            return res.json({ ...info, token })
        } catch (error) {
            console.log(error)
        }
    }

    // @desc   Auth user
    // @route  POST /api/users/login
    // @access Public
    async loginUser(req, res) {
        try {
            const { email } = req.body
            const user = await User.findOne({ email })
            if (user && (await user.matchPassword(req.body.password))) {
                const token = generateToken(user._id)
                const { password, ...info } = user._doc
                return res.json({ ...info, token })
            } else {
                res.status(400).json({})

                throw new Error("Incorrect login or password")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default new UserController()
