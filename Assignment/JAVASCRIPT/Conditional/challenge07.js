//  Q.   Write a function that uses switch case to return day name for valid inputs otherwise "Invalid Day"

// You just need to implement the getDayOfWeek function
function getDayOfWeek(day) {
    // Return the corresponding day of the week based on the input number
      switch(day){
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturday";
  
      case 7:
        return "Sunday";
  
      default:
      return "Invalid Day";
  
    }   
  }
console.log(getDayOfWeek("Monday"));
  