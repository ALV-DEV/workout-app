import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { $api } from "../../../api/api"
import styles from "./SongleWorkout.module.scss"

const SingleWorkout = () => {
    const { id } = useParams()
    const [workout, setWorkout] = useState(null)
    const navigate = useNavigate()

    const {} = useQuery("get workout", () => $api({ url: `/workout/${id}` }), {
        onSuccess(data) {
            setWorkout(data)
        },
    })

    const { mutate } = useMutation(
        "create exercise log",
        ({ exerciseId, times }) =>
            $api({
                type: "POST",
                url: "/exercise/log",
                body: { exerciseId, times },
            }),
        {
            onSuccess(data) {
                navigate(`/exercise/${data._id}`)
            },
        }
    )

    return (
        <div className={`${styles["workout"]}`}>
            <div className={`${styles["workout__header"]} header-page p-30`}>
                <time className={styles.workout__time}>
                    {workout?.minutes} минут
                </time>
                <h1 className={styles["workout__title"]}>{workout?.name}</h1>
            </div>
            <div className={styles.workout__content}>
                {workout?.exercises.map((ex) => (
                    <button
                        key={ex._id}
                        className={styles.workout__btn}
                        onClick={() =>
                            mutate({ exerciseId: ex._id, times: ex.times })
                        }
                    >
                        <span>{ex.name}</span>
                        <img
                            src={`/static/exercises/${ex.imageName}.svg`}
                            alt='exercises img'
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SingleWorkout
