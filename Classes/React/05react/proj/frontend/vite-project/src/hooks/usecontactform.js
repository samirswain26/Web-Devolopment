import { useState } from "react";

export function usecontactform(){
    const [Loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const submitcontact = async(FormData) => {
        setLoading(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            const res = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(FormData)
            })
            const data = await res.json()
            if(!res.ok) throw new Error(data.Error || "Something went wrong")
                setSuccessMessage(data.success || "Message sent")
        } catch (error) {
            setErrorMessage(error.message || "Request Failed")
        }finally{
            setLoading(false)
        }
    }
    return{
        Loading,
        successMessage,
        errorMessage,
        submitcontact
    }
} 