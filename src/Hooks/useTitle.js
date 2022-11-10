import { useEffect } from "react"


const useTitle = (title) => {
    useEffect(() => {
        document.title = `HF-(${title})`;
    }, [title])
}

export default useTitle;