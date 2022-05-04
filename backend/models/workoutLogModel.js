import mongoose from "mongoose"

const workoutLogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        workout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            required: true,
        },
        comleted: { type: Boolean, default: false },
    },
    { minimize: false, timestamps: true }
)

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogSchema)

export default WorkoutLog
