import Field from "../../ui/Field/Field"
import Button from "../../ui/Button/Button"
import Select from "react-select"
import Alert from "../../ui/Alert/Alert"
import styles from "./NewWorkout.module.scss"
import { useState } from "react"
import { optionColor } from "./optionColor"
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { $api } from "../../../api/api"

const NewWorkout = () => {
    const [name, setName] = useState("")
    const [exercises, setExercises] = useState([])
    const [selectedExercise, setSelectedExercise] = useState([])

    const {} = useQuery("get exercises", () => $api({ url: "/exercise" }), {
        onSuccess(data) {
            setExercises(data)
        },
    })

    const { mutate, isSuccess } = useMutation(
        "Create new workout",
        ({ exIds }) =>
            $api({
                url: "/workout",
                type: "POST",
                body: { name, exercisesId: exIds },
            })
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        const exIds = selectedExercise.map((ex) => ex.value)
        mutate({ exIds })
    }
    return (
        <div className={`${styles["new-workout"]}`}>
            <div
                className={`${styles["new-workout__header"]} header-page p-30`}
            >
                <h1 className={styles["new-workout__title"]}>
                    Создание новой тренировки
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className={styles["new-workout__form"]}
            >
                {isSuccess && <Alert text='Тренировка добавлена' />}
                <Field
                    placeholder={"Название"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Link
                    to={"/new-exercise"}
                    className={styles["new-workout__form-link"]}
                >
                    Добавить новое упражнение
                </Link>
                <Select
                    classNamePrefix='select2-selection'
                    placeholder='Выбирете упражнения'
                    value={selectedExercise}
                    onChange={setSelectedExercise}
                    options={exercises.map((ex) => ({
                        value: ex._id,
                        label: ex.name,
                    }))}
                    theme={(theme) => optionColor(theme)}
                    isMulti={true}
                />
                <div className={styles["new-workout__form-btn"]}>
                    <Button collback={() => {}} text='Создать' />
                </div>
            </form>
        </div>
    )
}

export default NewWorkout
