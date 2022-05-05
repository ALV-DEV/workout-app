import styles from "./Header.module.scss"
import userImg from "../../../images/header/user.svg"
import menuImg from "../../../images/header/menu.svg"

const Header = () => {
    return (
        <header className={styles.header}>
            <button className={styles.header__btn}>
                <img src={userImg} alt='user icon' />
            </button>
            <button className={styles.header__btn}>
                <img src={menuImg} alt='menu icon' />
            </button>
        </header>
    )
}

export default Header
