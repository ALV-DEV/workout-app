import Auth from "../components/pages/Auth/Auth"
import Home from "../components/pages/home/Home"
import NewWorkout from "../components/pages/NewWorkout/NewWorkout"
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
]
