import { Routes, Route } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { privateRoutes, publicRoutes } from "../../../routes/routes"
const AppRouter = () => {
    const { isAuth } = useAuth()
    return (
        <Routes>
            {isAuth
                ? privateRoutes.map((route) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          element={<route.component />}
                      />
                  ))
                : publicRoutes.map((route) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          element={<route.component />}
                      />
                  ))}
        </Routes>
    )
}

export default AppRouter
