// Hoisting refers to the behaviour where JavaScript moves the declarations of variables, functions, and classes to the top of their scope during the compilation phase. 
// This can sometimes lead to surprising results, especially when using var, let, const, or function expressions.



console.log("Age is :" ,age)
// Temporary Dead Zone for let and const
// Temporary Dead Zone ...
// Temporary Dead Zone ...
let age = 24
// In case of const and let is also Hoist but we cannot access them bacause of Temporal Dead Zone



// If there is no VAribale named as aghe then it will give as :=
// ReferenceError: age is not defined


// due Hoisting,  the age variable is present but after initialization so the ReferenceEror is :-
// ReferenceError: Cannot access 'age' before initialization