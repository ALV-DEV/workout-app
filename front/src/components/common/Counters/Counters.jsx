import styles from "./Counters.module.scss"
const Counters = () => {
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
                    <td className={styles.counters__item}>7</td>
                    <td className={styles.counters__item}>1</td>
                    <td className={styles.counters__item}>5</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Counters
