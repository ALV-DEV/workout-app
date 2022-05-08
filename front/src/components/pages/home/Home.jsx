import Counters from "../../common/Counters/Counters"
import Button from "../../ui/Button/Button"
import styles from "./Home.module.scss"

const Home = () => {
    return (
        <main className={styles["main__wrapper"]}>
            <div className={styles["main__content"]}>
                <Button text={"Создать"} collback={() => {}} type='main' />
                <h1 className={styles.main__title}>Упражнения для плеч</h1>
                <Counters />
            </div>
        </main>
    )
}

export default Home
