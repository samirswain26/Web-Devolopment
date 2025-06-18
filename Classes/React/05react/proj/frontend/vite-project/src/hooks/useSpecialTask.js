import { useEffect, useState } from "react";

export function useSpecialTask () {
    const [task, setTask] = useState(null)
    const [loading, setloading] = useState(true)
    const [Error, setError] = useState(null)

    useEffect(()=>{
        fetch("/users/Somedata")
        .then((res) => {
            if(!res.ok) throw new Error("Failed to fetch the special Task")
            return res.json()
        })
        .then((data) => {
            setTask(data)
            setloading(false)
        })
        .catch((err) => setError(err.message || "Something went wrong in the pre-defined hook.",
            setloading(false)
        ))

    },[])


    return {task, loading, Error} 
}