import { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { $api } from "../../../api/api"
import styles from "./SingleExercise.module.scss"

const SingleWorkout = () => {
    const { id } = useParams()
    const [exercise, setExercise] = useState(null)

    const {} = useQuery(
        "get exercise log",
        () => $api({ url: `/exercise/log/${id}` }),
        {
            onSuccess(data) {
                setExercise(data)
            },
        }
    )

    return (
        <div className={`${styles["exercise"]}`}>
            <div className={`${styles["exercise__header"]} header-page p-30`}>
                <h1 className={styles["exercise__title"]}></h1>
            </div>
            <div className={styles.exercise__content}>dfhdfh</div>
        </div>
    )
}

export default SingleWorkout
