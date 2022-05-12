import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"

dotenv.config()

// Routes
import { userRouter } from "./routes/user.routes.js"
import { exerciseRouter } from "./routes/exercise.routes.js"
import { workoutRouter } from "./routes/workout.routes.js"

//middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

const app = express()
app.use(express.json())

const __dirname = path.resolve()
console.log(__dirname)
app.use("/static", express.static(path.join(__dirname, "/backend/static/")))

app.use("/api/users", userRouter)
app.use("/api/exercise", exerciseRouter)
app.use("/api/workout", workoutRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        mongoose
            .connect(process.env.MONGO_URI)
            .then(() => console.log("DB connection success"))
            .catch(() => console.log("error DB connection"))
        app.listen(PORT, () =>
            console.log(
                `server running in ${process.env.NODE_ENV} mode on PORT ${PORT} `
            )
        )
    } catch (error) {
        console.log(error)
    }
}

start()
