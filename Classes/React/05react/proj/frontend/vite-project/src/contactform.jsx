import { useState } from "react";
import { usecontactform } from "./hooks/usecontactform";

function ContactForm(){
    const [form, setForm] = useState({password : "", email: ""})
    const {Loading, successMessage, errorMessage, submitcontact} = usecontactform()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    return(
        <div>
            Contact Form
            <form onSubmit={handleSubmit}>
                <input 
                name="email"
                value = {form.email}
                onChange={handleChange}
                placeholder="Your email"
                />
                <input 
                name="password"
                value = {form.password}
                onChange={handleChange}
                placeholder="Your password"
                />
                <button type="submit" disabled = {Loading} >
                    {Loading ? "sending..." : "send"}
                </button>
            </form>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default ContactForm