import Home from "../components/pages/home/Home"
import NewWorkout from "../components/pages/NewWorkout/NewWorkout"
export const publicRoutes = [
    {
        path: "/",
        component: Home,
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
]
