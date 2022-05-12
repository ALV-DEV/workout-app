import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const useAuth = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    return {
        isAuth,
        setIsAuth,
    }
}
