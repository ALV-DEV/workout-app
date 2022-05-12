import Counters from "../../common/Counters/Counters"
import Button from "../../ui/Button/Button"
import styles from "./Home.module.scss"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { useUser } from "../../../hooks/useUser"
import { $api } from "../../../api/api"

import { useMutation } from "react-query"
import { useEffect } from "react"

const Home = () => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    const { setUser, user } = useUser()
    const { mutate: getUser } = useMutation(
        "get user profile",
        () =>
            $api({
                url: "/users/profile",
            }),
        {
            onSuccess(data) {
                setUser(data)
                console.log(user)
            },
        }
    )
    useEffect(() => {
        isAuth && getUser()
    }, [isAuth])
    return (
        <main className={styles["main__wrapper"]}>
            <div className={styles["main__content"]}>
                {isAuth ? (
                    <>
                        <Button
                            text={"Создать"}
                            collback={() => navigate("/new-workout")}
                            type='main'
                        />
                        <h1 className={styles.main__title}>
                            Упражнения для плеч
                        </h1>
                        <Counters
                            minutes={user.minutes}
                            kgs={user.kgs}
                            wokrkouts={user.wokrkouts}
                        />
                    </>
                ) : (
                    <h1 className={styles["main__title-no-auth"]}>
                        Добро пожаловать в домашний менеджер тренировок
                    </h1>
                )}
            </div>
        </main>
    )
}

export default Home
