import ExerciseLog from "../models/exreciseLogModel.js"
import WorkoutLog from "../models/workoutLogModel.js"
import Workout from "../models/workoutModel.js"

class WorkoutController {
    // @desc   add new workout
    // @route  POST /api/workouts
    // @access Private
    async addWorkout(req, res) {
        try {
            const { name, exercisesId } = req.body
            const workout = await Workout.create({
                name,
                exercises: exercisesId,
            })
            return res.json(workout)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   Get workout
    // @route  GET /api/workouts/:id
    // @access Private
    async getWorkout(req, res) {
        try {
            const workout = await Workout.findById(req.params.id)
                .populate("exercises")
                .lean()
            const minutes = Math.ceil(workout.exercises.length * 3.7)
            return res.json({ ...workout, minutes })
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   Get workouts
    // @route  GET /api/workouts
    // @access Private
    async getAllWorkouts(req, res) {
        try {
            const workouts = await Workout.find().populate("exercises").lean()
            return res.json(workouts)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   update workout
    // @route  PUT /api/workouts/:id
    // @access Private
    async updateWorkout(req, res) {
        try {
            const { name, exercisesId } = req.body
            const workout = await Workout.findById(req.params.id)
            if (!workout) {
                res.status(404).json({ message: "Workout not found" })
                throw new Error("Workout not found")
            }
            workout.name = name
            workout.exercises = exercisesId
            const updatedWorkout = await workout.save()
            return res.json(updatedWorkout)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   update exercises in workout
    // @route  PUT /api/workouts/exercises/:id
    // @access Private
    async updateExercisesWorkout(req, res) {
        try {
            const { exerciseId } = req.body
            const { type } = req.query
            const workout = await Workout.findById(req.params.id)
            if (!workout) {
                res.status(404).json({ message: "Workout not found" })
                throw new Error("Workout not found")
            }
            if (type === "add") {
                workout.exercises.push(exerciseId)
            } else if (type === "delete") {
                workout.exercises = workout.exercises.filter(
                    (item) => item !== exerciseId
                )
            }

            const updatedWorkout = await workout.save()
            return res.json(updatedWorkout)
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   delete workout
    // @route  DELETE /api/workouts/:id
    // @access Private
    async deleteWorkout(req, res) {
        try {
            const workout = await Workout.findByIdAndDelete(req.params.id)
            if (!workout) {
                res.status(404).json({ message: "Workout not found" })
                throw new Error("Workout not found")
            }
            return res.json({ message: "Workout deleted" })
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   create workout log
    // @route  POST /api/workouts/log
    // @access Private
    async createWorkoutLog(req, res) {
        try {
            const { workoutId } = req.body
            const workout = await Workout.findById(workoutId).populate(
                "exercises"
            )

            if (!workout) {
                res.status(404).json({ message: "Workout not found" })
                throw new Error("Workout not found")
            }
            const workoutLog = await WorkoutLog.create({
                user: req.user._id,
                workout: workoutId,
            })

            const logs = workout.exercises.map((ex) => {
                let timesArray = []
                for (let i = 0; i < ex.times; i++) {
                    timesArray.push({
                        weight: 0,
                        repeat: 0,
                    })
                }
                return {
                    user: req.user._id,
                    exercise: ex._id,
                    times: timesArray,
                    workoutLog: workoutLog._id,
                }
            })

            const createdExLog = await ExerciseLog.insertMany(logs)
            const exLogsId = createdExLog.map((log) => log._id)
            const updatedWorkoutLog = await WorkoutLog.findById(workoutLog._id)
            updatedWorkoutLog.exercisesLog = exLogsId
            await updatedWorkoutLog.save()
            return res.json(updatedWorkoutLog)
        } catch (error) {
            throw new Error(error)
        }
    }
    // @desc   get workout log
    // @route  GET /api/workouts/log/:id
    // @access Private
    async getWorkoutLog(req, res) {
        try {
            const workoutLog = await WorkoutLog.findById(req.params.id)
                .populate("workout")
                .populate({
                    path: "exercisesLog",
                    populate: { path: "exercise" },
                })
                .lean()
            if (!workoutLog) {
                res.status(404).json({ message: "WorkoutLog not found" })
                throw new Error("WorkoutLog not found")
            }
            const minutes = Math.ceil(workoutLog.workout.exercises.times * 3.7)
            return res.json({ ...workoutLog, minutes })
        } catch (error) {
            throw new Error(error)
        }
    }

    // @desc   update workout log comleted status
    // @route  PUT /api/workouts/log/:id
    // @access Private
    async updateWorkoutLogComleted(req, res) {
        try {
            const workoutLog = await WorkoutLog.findById(req.params.id)
            if (!workoutLog) {
                res.status(404).json({ message: "WorkoutLog not found" })
                throw new Error("WorkoutLog not found")
            }
            workoutLog.comleted = !workoutLog.comleted
            const updatedWorcoutLog = await workoutLog.save()
            return res.json(updatedWorcoutLog)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new WorkoutController()
