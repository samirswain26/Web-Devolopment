import { useState } from "react"
import { useNavigate } from "react-router"
import apiClient from "../../service/apiClient"


function Signup () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            console.log("Tyring to signup");
            const data = await apiClient.signup(name, email, password)
            console.log(`Signup data: `, data)

        } catch (error) {
            
        }

        // Make an API call to backend with data
        // get response from backend
        // take action based on response
        
    }


    return (
        <div>
            <h1>Welcome to SignUp page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-groups">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
                <div className="form-groups">
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
                <div className="form-groups">
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
                >{loading ? 'Signup.....' : 'Signup'}</button>

                <p style={{ marginTop: '1rem' }}>
                    Already have an accont?{" "}
                    <button
                        onClick = {()=> navigate("/Login")}
                        style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
                    >
                    Login here
                    </button>
                </p>
            </form>
        </div>
    )
}


export default Signup