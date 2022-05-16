import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { $api } from "../../../api/api"
import Alert from "../../ui/Alert/Alert"
import Button from "../../ui/Button/Button"
import styles from "./SingleExercise.module.scss"

const SingleWorkout = () => {
    const { id } = useParams()
    const [timer, setTimer] = useState(null)
    const navigate = useNavigate()
    const { refetch, data } = useQuery("get exercise log", () =>
        $api({ url: `/exercise/log/${id}` })
    )

    const { mutate: completeExercise } = useMutation(
        "comlete exercise",
        ({ value }) =>
            $api({
                body: { value },
                type: "PUT",
                url: `exercise/log/complete/${id}`,
            }),
        {
            onSuccess() {
                refetch()
            },
        }
    )

    const { mutate: updateExerciseLog, error: updateExError } = useMutation(
        "update exercise log",
        ({ timeIndex, key, value }) =>
            $api({
                type: "PUT",
                body: { timeIndex, key, value },
                url: `exercise/log/${id}`,
            }),
        {
            onSuccess() {
                refetch()
            },
        }
    )
    const repeatExercise = () => {
        data?.times.forEach((item, index) => {
            updateExerciseLog({
                timeIndex: index,
                key: "comleted",
                value: false,
            })
        })
        completeExercise({ value: false })
    }
    const updateChange = (timeIndex, key, value) => {
        if (timer) {
            clearTimeout(timer)
        }
        value &&
            setTimer(
                setTimeout(() => {
                    updateExerciseLog({ timeIndex, key, value })
                }, 500)
            )
    }

    return (
        <div className={`${styles["exercise"]}`}>
            <div className={`${styles["exercise__header"]} header-page p-30`}>
                <div className={styles["exercise__header-wrap"]}>
                    <img
                        src={`/static/exercises/${data?.exercise.imageName}.svg`}
                        alt='exercises img'
                        height={70}
                    />
                    <h1 className={styles["exercise__title"]}>
                        {data?.exercise.name}
                    </h1>
                </div>
            </div>
            <div className={styles.exercise__content}>
                {updateExError && (
                    <Alert
                        type='error'
                        text={"Ошибка сервера побробуте ещё раз"}
                    />
                )}
                {data?.comleted && (
                    <>
                        <Alert text={"Вы закончили упражнение"} />
                        <div className={styles["exercise__success-btn"]}>
                            <Button
                                text={"К тренировке"}
                                collback={() => navigate(-1)}
                            />
                            <Button
                                text={"Повторить"}
                                collback={repeatExercise}
                            />
                        </div>
                    </>
                )}
                <table className={styles.exercise__table}>
                    <thead>
                        <tr className={styles["exercise__table-head"]}>
                            <th
                                className={styles["exercise__table-head__item"]}
                            >
                                Предыдущий
                            </th>
                            <th
                                className={styles["exercise__table-head__item"]}
                            >
                                Повторения и вес
                            </th>
                            <th
                                className={styles["exercise__table-head__item"]}
                            >
                                Выполнено
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.times.map((item, index) => (
                            <tr
                                key={item._id}
                                className={styles["exercise__table-row"]}
                            >
                                <td
                                    className={`${styles["exercise__table-item"]} `}
                                >
                                    <div
                                        className={`${
                                            styles[
                                                "exercise__table-item__inner"
                                            ]
                                        } ${
                                            item.comleted &&
                                            styles["exercise__table-completed"]
                                        }`}
                                    >
                                        <input
                                            type='number'
                                            disabled
                                            value={item.prevWeight}
                                            className={
                                                styles.exercise__disabled
                                            }
                                        />
                                        <i
                                            className={
                                                styles.exercise__disabled
                                            }
                                        >
                                            kg/
                                        </i>
                                        <input
                                            type='number'
                                            disabled
                                            value={item.prevRepeat}
                                            className={
                                                styles.exercise__disabled
                                            }
                                        />
                                    </div>
                                </td>

                                <td className={styles["exercise__table-item"]}>
                                    <div
                                        className={`${
                                            styles[
                                                "exercise__table-item__inner"
                                            ]
                                        } ${
                                            item.comleted &&
                                            styles["exercise__table-completed"]
                                        }`}
                                    >
                                        <input
                                            type='number'
                                            defaultValue={item.weight}
                                            disabled={item.comleted}
                                            onChange={(e) => {
                                                updateChange(
                                                    index,
                                                    "weight",
                                                    e.target.value
                                                )
                                            }}
                                        />
                                        <i>kg/</i>
                                        <input
                                            type='number'
                                            defaultValue={item.repeat}
                                            disabled={item.comleted}
                                            onChange={(e) => {
                                                updateChange(
                                                    index,
                                                    "repeat",
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                </td>
                                <td className={styles["exercise__table-item"]}>
                                    <input
                                        type='checkbox'
                                        onChange={() => {
                                            if (
                                                index ===
                                                data?.times?.length - 1
                                            ) {
                                                completeExercise({
                                                    value: true,
                                                })
                                            }
                                            updateExerciseLog({
                                                timeIndex: index,
                                                key: "comleted",
                                                value: !item.comleted,
                                            })
                                        }}
                                        checked={item.comleted}
                                        id={`check${index}`}
                                    />
                                    <label htmlFor={`check${index}`}></label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SingleWorkout
