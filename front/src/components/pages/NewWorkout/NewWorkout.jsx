import Field from "../../ui/Field/Field"
import Button from "../../ui/Button/Button"
import Select from "react-select"

import styles from "./NewWorkout.module.scss"
import { useState } from "react"
import { optionColor } from "./optionColor"
import { Link } from "react-router-dom"

const NewWorkout = () => {
    const [name, setName] = useState("")
    const [exercises, setExercises] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
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
                    value={exercises}
                    onChange={setExercises}
                    options={[
                        { value: 0, label: "Отжимания" },
                        { value: 1, label: "Приседания" },
                        { value: 2, label: "Скручивания" },
                    ]}
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
