import Exercise from "../models/exerciseModel.js"
import ExerciseLog from "../models/exreciseLogModel.js"

class ExerciseController {
    // @desc   add new exercise
    // @route  POST /api/exercise
    // @access Private
    async addExercise(req, res) {
        try {
            const { name, times, image } = req.body
            const exercise = await Exercise.create({ name, times, image })
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
        const prevExercise = await ExerciseLog.find({
            user: req.user._id,
            exercise: exerciseId,
        }).sort("desc")

        if (prevExercise[0]) {
            timesArray = prevExercise[0].times
        } else {
            for (let i = 0; i < times; i++) {
                timesArray.push({
                    weight: 0,
                    repeat: 0,
                })
            }
        }

        const exerciseLog = await ExerciseLog.create({
            user: req.user._id,
            exercise: exerciseId,
            times: timesArray,
        })

        return res.json(exerciseLog)
    }
}

export default new ExerciseController()
