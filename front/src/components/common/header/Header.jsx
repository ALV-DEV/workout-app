import styles from "./Header.module.scss"
import userImg from "../../../images/header/user.svg"
import menuImg from "../../../images/header/menu.svg"
import menuCloseImg from "../../../images/header/menuClose.svg"
import { useState } from "react"
import { Link } from "react-router-dom"

const menuItem = [
    {
        path: "/workouts",
        title: "Тренировки",
    },
    {
        path: "/new-workout",
        title: "Создать новую",
    },
    {
        path: "/profile",
        title: "Профиль",
    },
]

const Header = () => {
    const [show, setShow] = useState(false)
    return (
        <header className={styles.header}>
            <button className={styles.header__btn}>
                <img src={userImg} alt='user icon' />
            </button>
            <nav className={styles.header__menu}>
                <button
                    className={styles.header__btn}
                    onClick={() => setShow(!show)}
                >
                    <img src={show ? menuCloseImg : menuImg} alt='menu icon' />
                </button>
                <ul
                    className={`${styles["header__menu-list"]} ${
                        show && styles["show"]
                    }`}
                >
                    {menuItem.map((item) => (
                        <li className={styles["header__menu-item"]}>
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    ))}
                    <li className={styles["header__menu-item"]}>
                        <button className={styles["header__menu-btn"]}>
                            Выйти
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
