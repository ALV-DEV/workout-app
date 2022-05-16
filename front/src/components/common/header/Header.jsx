import styles from "./Header.module.scss"
import userImg from "../../../images/header/user.svg"
import menuImg from "../../../images/header/menu.svg"
import authImg from "../../../images/header/authHeaderIcon.svg"
import menuCloseImg from "../../../images/header/menuClose.svg"
import backArrow from "../../../images/header/backArrow.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { useOutside } from "../../../hooks/useOutside"

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
    const { isShow, ref, setIsShow } = useOutside(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuth, setIsAuth } = useAuth()
    const logout = () => {
        localStorage.removeItem("token")
        setIsAuth(false)
        navigate("/login")
    }
    console.log(isAuth)
    return (
        <header className={styles.header} ref={ref}>
            {isAuth ? (
                <>
                    {location.pathname === "/" ? (
                        <button className={styles.header__btn}>
                            <img src={authImg} alt='user icon' height={60} />
                        </button>
                    ) : (
                        <button
                            className={styles.header__btn}
                            onClick={() => navigate(-1)}
                        >
                            <img src={backArrow} alt='back icon' />
                        </button>
                    )}
                </>
            ) : (
                <button
                    className={styles.header__btn}
                    onClick={() => navigate("/login")}
                >
                    <img src={userImg} alt='user icon' />
                </button>
            )}
            {isAuth && (
                <nav className={styles.header__menu}>
                    <button
                        className={styles.header__btn}
                        onClick={() => setIsShow(!isShow)}
                    >
                        <img
                            src={isShow ? menuCloseImg : menuImg}
                            alt='menu icon'
                        />
                    </button>
                    <ul
                        className={`${styles["header__menu-list"]} ${
                            isShow && styles["show"]
                        }`}
                    >
                        {menuItem.map((item) => (
                            <li
                                key={item.path}
                                className={styles["header__menu-item"]}
                                onClick={() => setIsShow(false)}
                            >
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        ))}
                        <li className={styles["header__menu-item"]}>
                            <button
                                className={styles["header__menu-btn"]}
                                onClick={logout}
                            >
                                Выйти
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header
