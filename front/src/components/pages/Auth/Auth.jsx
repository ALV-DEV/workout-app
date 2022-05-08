import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Alert from "../../ui/Alert/Alert"
import Button from "../../ui/Button/Button"
import Field from "../../ui/Field/Field"
import styles from "./Auth.module.scss"
const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { pathname } = useLocation()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (pathname === "/login") {
            console.log("login")
        } else {
            console.log("register")
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
                {/* <Alert text={"Регистрация завешена"} type='warning' /> */}

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
