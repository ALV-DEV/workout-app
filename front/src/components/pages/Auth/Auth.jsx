import { useState } from "react"
import { useMutation } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { $api } from "../../../api/api"
import { useAuth } from "../../../hooks/useAuth"
import Alert from "../../ui/Alert/Alert"
import Button from "../../ui/Button/Button"
import Field from "../../ui/Field/Field"
import styles from "./Auth.module.scss"
const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { setIsAuth } = useAuth()
    const {
        mutate: register,
        isLoading,
        error,
    } = useMutation(
        "register",
        () =>
            $api({
                url: "/users",
                type: "POST",
                auth: false,
                body: { email, password },
            }),
        {
            onSuccess(data) {
                localStorage.setItem("token", data.token)
                setIsAuth(true)
                navigate("/")
            },
        }
    )

    const {
        mutate: login,
        isLoading: isLoadLogin,
        error: loginError,
    } = useMutation(
        "login",
        () =>
            $api({
                url: "/users/login",
                type: "POST",
                auth: false,
                body: { email, password },
            }),
        {
            onSuccess(data) {
                localStorage.setItem("token", data.token)
                setIsAuth(true)
                navigate("/")
            },
        }
    )
    const handleSubmit = (e) => {
        e.preventDefault()
        if (pathname === "/login") {
            login()
        } else {
            register()
        }
    }
    return (
        <div className={`${styles["auth-page"]}`}>
            <div className={`${styles["auth-page__header"]} header-page p-30`}>
                <h1 className={styles["auth-page__title"]}>
                    {pathname === "/login" ? "Авторизация" : "Регистрация"}
                </h1>
            </div>
            <form onSubmit={handleSubmit} className={styles["auth-page__form"]}>
                {error && <Alert text={error} type='error' />}
                {loginError && <Alert text={error} type='error' />}

                <Field
                    type='email'
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Field
                    type='password'
                    placeholder={"Пароль"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles["auth-page__form-btn"]}>
                    <Button
                        collback={() => {}}
                        text={
                            pathname === "/login"
                                ? "Войти"
                                : "Зарегистрироваться"
                        }
                    />
                    {pathname === "/login" ? (
                        <Link
                            to={"/register"}
                            className={styles["auth-page__form-link"]}
                        >
                            Регистрация
                        </Link>
                    ) : (
                        <Link
                            to={"/login"}
                            className={styles["auth-page__form-link"]}
                        >
                            Авторизация
                        </Link>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Auth
