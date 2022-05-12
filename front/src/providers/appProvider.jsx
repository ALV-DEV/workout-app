import { useState } from "react"
import { AuthContext } from "../context/authContext"
import { UserContext } from "../context/userContext"

const AppProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"))
    const [user, setUser] = useState({})
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppProvider
