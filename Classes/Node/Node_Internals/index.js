// Require is the built-in wraper known as module wraper that already exists in the Node.js
// There are five built-in wrappers are there in Node.js
// (function(exports, require, module, __filename, __dirname) {
//   // Module code actually goes here
// });


const a = require("fs")
a.writeFile("./test.txt", "Hello World!", () => {})