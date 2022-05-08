import styles from "./Alert.module.scss"
const Alert = ({ type = "success", text }) => {
    return (
        <div
            className={`${styles.alert} ${type === "error" && styles.error} ${
                type === "info" && styles.info
            } ${type === "warning" && styles.warning}`}
        >
            {text}
        </div>
    )
}

export default Alert
