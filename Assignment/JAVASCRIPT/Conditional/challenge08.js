//  Write a function that uses if-else to classify a number.


function checkNumberType(num) {
    // Return "Positive", "Negative", or "Zero" based on the input number
    if (num > 0){
      return "Positive"
    }else if (num < 0){
      return "Negative"
    }else{
      return "Zero"
    }
}

console.log(checkNumberType(45));
