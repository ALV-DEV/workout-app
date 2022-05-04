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
                exrcises: exercisesId,
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
                .populate("exrcises")
                .lean()
            const minutes = Math.ceil(workout.exrcises.length * 3.7)
            return res.json({ ...workout, minutes })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new WorkoutController()
