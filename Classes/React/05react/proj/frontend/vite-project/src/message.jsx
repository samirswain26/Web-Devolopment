import { useState, useEffect } from "react";

export function  Platform (){
    const [platform, setPlatform] = useState([])
    const [error, setError] = useState("")
 
    useEffect(() => {
        fetch("/users/Someme")
        .then(res => res.json())
        .then(data => setPlatform(data))
        .catch(err => setError(err.message))
    }, [])

    return(
        <div>
            <h2>Available Platforms</h2>
            <ul>
                {platform.map((message)=>(
                    <li key={message.id}>{message.name}</li>
                ))}
            </ul>
        </div>
    )
}