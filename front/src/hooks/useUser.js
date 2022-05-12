import { useContext } from "react"
import { UserContext } from "../context/userContext"

export const useUser = () => {
    const { setUser, user } = useContext(UserContext)
    return {
        user,
        setUser,
    }
}
