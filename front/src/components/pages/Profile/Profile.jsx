import { useUser } from "../../../hooks/useUser"
import styles from "./Profile.module.scss"
import userImg from "../../../images/profile/profile__user.svg"
import Counters from "../../common/Counters/Counters"
import beforeImg from "../../../images/profile/profile__before.png"
import afterImg from "../../../images/profile/profile__after.png"

const Profile = () => {
    const { user } = useUser()
    console.log(user)
    return (
        <div className={`${styles["profile"]}`}>
            <div className={`${styles["profile__header"]} header-page p-30`}>
                <img src={userImg} alt='user img' />
                <h1 className={styles["profile__title"]}>{user.email}</h1>
                <Counters
                    kgs={user.kgs}
                    minutes={user.minutes}
                    wokrkouts={user.wokrkouts}
                />
            </div>
            <div className={styles.profile__content}>
                <div className={styles["profile__content-inner"]}>
                    <h2 className={styles["profile__content-title"]}>До</h2>

                    <div className={styles.profile__img}>
                        <img src={beforeImg} alt='before' />
                    </div>
                </div>

                <div className={styles["profile__content-inner"]}>
                    <h2 className={styles["profile__content-title"]}>После</h2>

                    <div className={styles.profile__img}>
                        <img src={afterImg} alt='after' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
