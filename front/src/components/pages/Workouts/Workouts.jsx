import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { $api } from "../../../api/api"
import styles from "./Workouts.module.scss"

const SingleWorkout = () => {
    const [workouts, setWorkouts] = useState(null)
    const navigate = useNavigate()

    const {} = useQuery("get workouts", () => $api({ url: `/workout` }), {
        onSuccess(data) {
            setWorkouts(data)
        },
    })

    const { mutate } = useMutation(
        "create workout log",
        ({ workoutId }) =>
            $api({
                type: "POST",
                url: "/workout/log",
                body: { workoutId },
            }),
        {
            onSuccess(data) {
                navigate(`/workouts/${data._id}`)
            },
        }
    )

    return (
        <div className={`${styles["workouts"]}`}>
            <div className={`${styles["workouts__header"]} header-page p-30`}>
                <h1 className={styles["workouts__title"]}>Все тренировки</h1>
            </div>
            <div className={styles.workouts__content}>
                {workouts?.map((workout) => (
                    <button
                        key={workout._id}
                        className={styles.workouts__btn}
                        onClick={() => mutate({ workoutId: workout._id })}
                    >
                        <span>{workout.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SingleWorkout
