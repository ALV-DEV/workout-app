import styles from "./Button.module.scss"

const Button = ({ text, collback, type = "purple" }) => {
    return (
        <button
            onClick={collback}
            className={`${styles.button} ${styles[type]}`}
        >
            {text}
        </button>
    )
}

export default Button
