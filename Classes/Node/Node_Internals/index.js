// Require is the built-in wraper known as module wraper that already exists in the Node.js
// There are five built-in wrappers are there in Node.js
// (function(exports, require, module, __filename, __dirname) {
//   // Module code actually goes here
// });



// Here "fs" is the module that is built-in node. There are lots of modules are there.
const a = require("fs")
a.writeFile("./test.txt", "Hello World!", () => {})



const abc = require("./math")
// console.log(math.add(2,6))

// console.log(abc.add(2,7))
// console.log(abc.multiply(2,7))


// To create a server Nodes gives you a "http" package

const http = require('http')
const express = require("express")

const app = express()
app.get("/", (req,res) => res.end("HOMEPAGE"))
app.get("/about-us", (req,res) => res.end("About us"))
app.get("/contact", (req,res) => res.end("Contact Us"))

function handelerfunc (req, res){
    console.log('Incoming Req Aagya.....');
    switch(req.method){
        case "GET": {
            if(req.url === '/') return res.end("Homepage")
            if(req.url === '/about-us') return res.end("About Us")
            if(req.url === '/contact') return res.end("Contact Us")
        }
        break;
        case "POST":{}
        break;
    }
    console.log(req.url), console.log(req.method)
}
const server = http.createServer(app)


server.listen(8000, function(){
    console.log("Server Started")
})