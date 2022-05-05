import mongoose from "mongoose"

const exerciseLogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise",
            required: true,
        },
        comleted: { type: Boolean, default: false },
        times: [
            {
                weight: { type: Number, required: true },
                repeat: { type: Number, required: true },
                comleted: { type: Boolean, default: false },
            },
        ],

        workoutLog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkoutLog",
            required: true,
        },
    },

    { minimize: false, timestamps: true }
)

const ExerciseLog = mongoose.model("ExerciseLog", exerciseLogSchema)

export default ExerciseLog
