import { useEffect } from "react"

const useTitle = (title): void => {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => { document.title = prevTitle }
    }, [title])
}

export default useTitle