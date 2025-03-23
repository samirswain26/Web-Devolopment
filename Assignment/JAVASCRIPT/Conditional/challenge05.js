// Q. Write a function to check a year is leap year. 
//  A leap year is divisible by 4, but not by 100 unless also divisible by 400.

function isleapyear(year){
    if ((year%4 === 0 && year % 100 !== 0) || year % 400 === 0 ){
        return "Leap Year"
    }else{
        return "Not A Leap Year."
    }
}
console.log(isleapyear(2020));



