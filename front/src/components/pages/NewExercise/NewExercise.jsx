import Field from "../../ui/Field/Field"
import Button from "../../ui/Button/Button"

import styles from "./NewExercise.module.scss"
import { useState } from "react"
import Alert from "../../ui/Alert/Alert"
import { useMutation } from "react-query"
import { $api } from "../../../api/api"

const dataImages = ["chest", "choulders", "biceps", "legs", "hit"]

const NewExercise = () => {
    const [name, setName] = useState("")
    const [times, setTimes] = useState(0)
    const [imageName, setImageName] = useState(dataImages[0])
    const { mutate, error, isSuccess } = useMutation(
        "create exercise",
        () =>
            $api({
                url: "/exercise",
                type: "POST",
                body: { name, times, imageName },
            }),
        {
            onSuccess(data) {
                setImageName(dataImages[0])
                setName("")
                setTimes(0)
            },
        }
    )
    const handleSubmit = (e) => {
        e.preventDefault()
        mutate()
    }

    return (
        <div className={`${styles["new-exercise"]}`}>
            <div
                className={`${styles["new-exercise__header"]} header-page p-30`}
            >
                <h1 className={styles["new-exercise__title"]}>
                    Создание нового упражнения
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className={styles["new-exercise__form"]}
            >
                {error && <Alert text={error} type='error' />}
                {isSuccess && <Alert text={"Упражнение создано"} />}

                <Field
                    placeholder={"Название"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Field
                    placeholder={"Повторения"}
                    value={times}
                    onChange={(e) => setTimes(e.target.value)}
                />
                <div className={styles["new-exercise__images"]}>
                    {dataImages.map((image) => (
                        <img
                            src={`/static/exercises/${image}.svg`}
                            alt={image}
                            key={image}
                            className={image === imageName && styles.active}
                            onClick={() => setImageName(image)}
                        />
                    ))}
                </div>
                <div className={styles["new-exercise__form-btn"]}>
                    <Button collback={() => {}} text='Создать' />
                </div>
            </form>
        </div>
    )
}

export default NewExercise
