import { useEffect, useRef, useState } from "react"

export const useOutside = (initialIsVisible) => {
    const [isShow, setIsShow] = useState(initialIsVisible)
    const ref = useRef(null)
    const hendleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", hendleClickOutside, true)
        return () => {
            document.removeEventListener("click", hendleClickOutside, true)
        }
    })

    return { ref, isShow, setIsShow }
}
