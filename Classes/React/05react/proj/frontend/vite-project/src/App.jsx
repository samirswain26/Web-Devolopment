import { useState, useEffect } from 'react'
import './App.css'
import { Platform } from './message'
import {  useSpecialTask } from './hooks/useSpecialTask.js'

function App() {
  const [message, setmessage] = useState("Loading...")
  const {task, loading, Error} = useSpecialTask()

  useEffect(()=>{
      fetch("/users/coders")
      .then((res)=> res.json())
      .then((data) => setmessage(data.message))
      .catch(() => setmessage("Failed to load"))
  }, [])

  return (
   <div>
    <h1>Welcome To Code Tech</h1>
    <p>My Backend server is running on PORT: 3000 <br /> And the URL is http://127.0.0.1:3000 <br /> </p>
    <p>My Frontend (Vite) server is running on PORT: 5173 <br /> And the URL is br http://localhost:5173 </p>
    <h1>{message}</h1>
    <Platform/>
    <task.name/>
   </div>

  )
}

export default App
