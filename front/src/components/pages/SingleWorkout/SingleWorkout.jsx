import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { $api } from "../../../api/api"
import Alert from "../../ui/Alert/Alert"
import styles from "./SingleWorkout.module.scss"

const SingleWorkout = () => {
    const { id } = useParams()
    const [workout, setWorkout] = useState(null)
    const [exerciseLog, setExerciseLog] = useState([])
    const navigate = useNavigate()

    const { data, refetch } = useQuery(
        "get workout log",
        () => $api({ url: `/workout/log/${id}` }),
        {
            onSuccess(data) {
                setWorkout(data.workout)
                setExerciseLog(data.exercisesLog)
            },
        }
    )

    const { mutate: comleteWorkout, isSuccess } = useMutation(
        "update comleted status workout",
        ({ value }) =>
            $api({
                body: { value },
                url: `/workout/log/${data._id}`,
                type: "PUT",
            }),
        {
            onSuccess() {
                refetch()
            },
        }
    )

    useEffect(() => {
        const countComletedExercises = exerciseLog?.filter(
            (item) => item.comleted
        ).length
        if (countComletedExercises === exerciseLog?.length) {
            console.log("conp")
            comleteWorkout({ value: true })
        } else {
            comleteWorkout({ value: false })
        }
    }, [comleteWorkout, exerciseLog, isSuccess])

    return (
        <div className={`${styles["workout"]}`}>
            <div className={`${styles["workout__header"]} header-page p-30`}>
                <time className={styles.workout__time}>
                    {data?.minutes} минут
                </time>
                <h1 className={styles["workout__title"]}>{workout?.name}</h1>
            </div>
            <div style={{ padding: "0px 20px", marginTop: "20px" }}>
                {data?.comleted && <Alert text={"Тренировка закончена"} />}
            </div>

            <div className={styles.workout__content}>
                {exerciseLog?.map((ex) => (
                    <button
                        key={ex._id}
                        className={`${styles.workout__btn} ${
                            ex.comleted && styles["workout__btn-comlete"]
                        }`}
                        onClick={() => navigate(`/exercise/${ex._id}`)}
                    >
                        <span>{ex.exercise.name}</span>
                        <img
                            src={`/static/exercises/${ex.exercise.imageName}.svg`}
                            alt='exercises img'
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SingleWorkout
