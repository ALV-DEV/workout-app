import { reBuildTimes } from "../helpers/reBuildTimes.js"
import Exercise from "../models/exerciseModel.js"
import ExerciseLog from "../models/exreciseLogModel.js"

class ExerciseController {
    // @desc   add new exercise
    // @route  POST /api/exercise
    // @access Private
    async addExercise(req, res) {
        try {
            const { name, times, imageId } = req.body
            const exercise = await Exercise.create({ name, times, imageId })
            return res.json(exercise)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   create exercise log
    // @route  POST /api/exercise/log
    // @access Private
    async createExerciseLog(req, res) {
        const { exerciseId, times } = req.body
        let timesArray = []
        for (let i = 0; i < times; i++) {
            timesArray.push({
                weight: 0,
                repeat: 0,
            })
        }

        const exerciseLog = await ExerciseLog.create({
            user: req.user._id,
            exercise: exerciseId,
            times: timesArray,
        })

        return res.json(exerciseLog)
    }

    // @desc   get exercise log
    // @route  GET /api/exercise/log/:id
    // @access Private
    async getExerciseLog(req, res) {
        try {
            const exerciseLog = await ExerciseLog.findById(req.params.id)
                .populate("exercise", "name imageId")
                .lean()
            const prevExercise = await ExerciseLog.find({
                user: req.user._id,
                exercise: exerciseLog._id,
            }).sort("desc")
            let newTimes = reBuildTimes(exerciseLog)
            if (prevExercise) {
                newTimes = reBuildTimes(exerciseLog, prevExercise[0])
            }
            return res.json({
                ...exerciseLog,
                times: newTimes,
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   update times exercise log
    // @route  PUT /api/exercise/log/:id
    // @access Private
    async updateExerciseLog(req, res) {
        try {
            const { timeIndex, key, value } = req.body
            const currentExerciseLog = await ExerciseLog.findById(req.params.id)
            if (!currentExerciseLog) {
                res.status(404).json({ message: "Log not found" })
                throw new Error("Log not found")
            }
            currentExerciseLog.times[timeIndex][key] = value
            const updatedExerciseLog = await currentExerciseLog.save()
            return res.json(updatedExerciseLog)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   update exercise log
    // @route  PUT /api/exercise/log/complete/:id
    // @access Private
    async updateCompleteExerciseLog(req, res) {
        try {
            const currentExerciseLog = await ExerciseLog.findById(
                req.params.id
            ).populate("exercise", "workout")
            if (!currentExerciseLog) {
                res.status(404).json({ message: "Log not found" })
                throw new Error("Log not found")
            }
            currentExerciseLog.comleted = !currentExerciseLog.comleted
            const updatedExerciseLog = await currentExerciseLog.save()
            return res.json(updatedExerciseLog)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   update exercise
    // @route  PUT /api/exercise/:id
    // @access Private
    async updateExercise(req, res) {
        try {
            const { name, times, imageId } = req.body
            const exercise = await Exercise.findById(req.params.id)
            if (!exercise) {
                res.status(404).json({ message: "Exercise not found" })
            }
            exercise.name = name
            exercise.times = times
            exercise.imageId = imageId
            const upadatedExercise = await exercise.save()
            return res.json(upadatedExercise)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   delete exercise
    // @route  DELETE /api/exercise/:id
    // @access Private
    async deleteExercise(req, res) {
        try {
            const exercise = await Exercise.findByIdAndDelete(req.params.id)
            if (!exercise) {
                res.status(404).json({ message: "Exercise not found" })
            }
            return res.json({ message: "Exercise deleted" })
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   get all exercises
    // @route  GET /api/exercise
    // @access Private
    async getAllExercises(req, res) {
        try {
            const exercises = await Exercise.find()
            if (!exercises) {
                res.status(404).json({ message: "Exercises not found" })
            }
            return res.json(exercises)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new ExerciseController()
