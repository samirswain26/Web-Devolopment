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

console.log(abc.add(2,7))
console.log(abc.multiply(2,7))
