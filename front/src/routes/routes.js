import Auth from "../components/pages/Auth/Auth"
import Home from "../components/pages/home/Home"
import NewExercise from "../components/pages/NewExercise/NewExercise"
import NewWorkout from "../components/pages/NewWorkout/NewWorkout"
import Profile from "../components/pages/Profile/Profile"
import SingleWorkout from "../components/pages/SingleWorkout/SingleWorkout"
import SingleExercise from "../components/pages/SingleExercise/SingleExercise"
import Workouts from "../components/pages/Workouts/Workouts"

export const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: Auth,
    },
    {
        path: "/register",
        component: Auth,
    },
]

export const privateRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/new-workout",
        component: NewWorkout,
    },
    {
        path: "/new-exercise",
        component: NewExercise,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/workouts/:id",
        component: SingleWorkout,
    },
    {
        path: "/exercise/:id",
        component: SingleExercise,
    },
    {
        path: "/workouts",
        component: Workouts,
    },
]
