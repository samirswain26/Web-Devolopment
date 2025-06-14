import { useState } from "react"
import apiClient from "../../service/apiClient"


function Login () {
    const [email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            console.log("Tyring to login");
            const data = await apiClient.login( email, password)
            console.log(`login data: `, data)

        } catch (error) {
            error.message
            console.log(error)
        }
        
    }

    return (
        <div>
            <h1>Welcome to login page</h1>
            <form onSubmit={handleSubmit}>
                <div className="Email">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="text"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button
                type="Submit"
                disabled = {loading}
                >{loading ? 'login.....' : 'Login'}
                </button>
            </form>
        </div>
    )
}


export default Login