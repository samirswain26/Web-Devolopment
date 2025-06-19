import { useState, useEffect } from 'react'
import './App.css'
import { Platform } from './message'
import {  useSpecialTask } from './hooks/useSpecialTask.js'

function App() {
  const [message, setmessage] = useState("Loading...")
  const {task, loading, Error} = useSpecialTask()
  console.log("task", task)

  useEffect(()=>{
      fetch("/users/coders")
      .then((res)=> res.json())
      .then((data) => setmessage(data.message))
      .catch(() => setmessage("Failed to load"))
  }, [])

  if(loading) return <h2>loading...</h2>
  if(Error) return <h2>Error: {Error} </h2>

  return (
   <div>
    <h1>Welcome To Code Tech</h1>
    <p>My Backend server is running on PORT: 3000 <br /> And the URL is http://127.0.0.1:3000 <br /> </p>
    <p>My Frontend (Vite) server is running on PORT: 5173 <br /> And the URL is br http://localhost:5173 </p>
    <h1>{message}</h1>
    <Platform/>
    <h3>{task.name}</h3>
   </div>

  )
}

export default App
