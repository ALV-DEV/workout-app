import mongoose from "mongoose"

const workoutSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
    },
    {
        minimize: false,
        timestamps: true,
    }
)

const Workout = mongoose.model("Workout", workoutSchema)

export default Workout
