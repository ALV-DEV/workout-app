import Auth from "../components/pages/Auth/Auth"
import Home from "../components/pages/home/Home"
import NewExercise from "../components/pages/NewExercise/NewExercise"
import NewWorkout from "../components/pages/NewWorkout/NewWorkout"
import Profile from "../components/pages/Profile/Profile"
import SingleWorkout from "../components/pages/SingleWorkout/SingleWorkout"
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
]
