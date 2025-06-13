import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setmessage] = useState("Loading...")

  useEffect(()=>{
      fetch("/users/coders")
      .then((res)=> res.json())
      .then((data) => setmessage(data.message))
      .catch(() => setmessage("Failed to load"))
  }, [])

  return (
   <div>
    <h1>Welcome To Code Tech</h1>
    <p>My Backend server is running on PORT: 3000 <br /> And the URL is http://127.0.0.1:3000 <br /> <br /> http://127.0.0.1:3000/api/v1/users/ </p>
    <p>My Frontend (Vite) server is running on PORT: 5173 <br /> And the URL is br http://localhost:5173 </p>
    <h1>{message}</h1>
   </div>

  )
}

export default App
