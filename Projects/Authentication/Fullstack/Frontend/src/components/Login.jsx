import { useState } from "react"
import apiClient from "../../service/apiClient"


function Login () {
    const [email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [message, setMesssage] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            console.log("Tyring to login");
            const data = await apiClient.login( email, password)
            console.log(`login data: `, data)

            if(data.message === "Login Successful"){
                setLoginSuccess(true)
                setMesssage("Login Successfully completed ")
            }else {
                setError("Login failed");
            }

        } catch (error) {
            console.log(error)
            setError("something went wrong")
        }finally{
            setLoading(false)
        }
        
    }

    return (
        <div>
          {loginSuccess ? (
            <p style={{ color: "White", fontWeight: "bold" }}>{message}</p>
          ) : (
            <>
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
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>
            </>
          )}
        </div>
    );
}

export default Login