require('module-alias/register');
const createExpress = require("server")

const c = createExpress()

c.getcallpar("/", (req,res) => res.end("HomePage"))
c.getcallpar("/contact", (req,res) => res.end("Contact Us"))
c.getcallpar("/about", (req,res) => res.end("About Us"))
c.postcallpar("/submit", (req,res) => res.end("Submitted"))

c.suno(8000, ()=>console.log("Server started at port 8000"))