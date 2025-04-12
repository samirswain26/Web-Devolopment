let isTrue = true; // Boolean
let nothing = null; // Object
let undefinedVar = undefined; // undefined
let symbolVar = Symbol(); // Symbol


let num = "42";
// let convertedNum = Number(num);
// let convertedNum = +num;
let convertedNum = parseInt(num);


let str = 123;
let convertedString = String(str);


let a = 10;
let b = 3;

let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
let power = a ** b;

let x = 10;
let y = 10;

// console.log(x == y); // Equal to
// console.log(x != y); // Not Equal to
// console.log(x > y);
// console.log(x < y);
// console.log(x <= y);


console.log( Math.floor((Math.random() * 6 )+ 1 ) )


let firstName = "sanir"
let lastName = "swain"

let fullName = firstName + " " + lastName //samir swain

let message = "Hello World"

console.log(message.toUpperCase());
console.log(message.indexOf("W"));
console.log(message.slice(0, 8));

let myName = "samir"

let greeting = `Hello ${myName}, how are you!`
console.log(greeting)