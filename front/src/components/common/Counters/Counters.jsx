import styles from "./Counters.module.scss"
const Counters = ({ minutes, kgs, wokrkouts }) => {
    return (
        <table className={styles.counters}>
            <thead className={styles.counters__head}>
                <tr>
                    <th className={styles["counters__head-item"]}>Минуты</th>
                    <th className={styles["counters__head-item"]}>
                        Тренировки
                    </th>
                    <th className={styles["counters__head-item"]}>
                        Килограммы
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.counters__item}>{minutes}</td>
                    <td className={styles.counters__item}>{wokrkouts}</td>
                    <td className={styles.counters__item}>{kgs}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Counters
