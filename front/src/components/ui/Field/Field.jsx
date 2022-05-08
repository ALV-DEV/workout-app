import styles from "./Field.module.scss"
const Field = ({ placeholder, value, onChange, type = "text" }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.input}
        />
    )
}

export default Field
