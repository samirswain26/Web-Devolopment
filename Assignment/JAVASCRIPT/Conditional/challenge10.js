//  Q. Write a function that uses switch-case to perform ariyhematic operations. Handle the edge case of "Cannot divisible by zero"


function calculator(num1, num2, operator) {
    // Perform basic arithmetic operations using switch case
     switch (operator) {
       case "+":
           return `"${num1}+${num2} = ${num1+num2}"` 
       case "-":
           return `"${num1}- ${num2} = ${num1-num2}" `
       case "*":
           return `"${num1} * ${num2} = ${num1*num2}" `
       case "/":
          return num2 !== 0 ? num1/num2:"cannot Divisible By Zero" 
}
}
console.log(calculator(2,0 ,"/" ));
