// Q. Write a function that returns the corresponding grade usinh if-else.

function calculategrade(marks){
    if(marks>= 90){
        return "A"
    }else if(marks >= 80){
        return "B"
    }else if(marks >= 70 ){
        return "C"
    }else if (marks >= 60){
        return "D"
    }else {
        return "F"
    }
}
console.log(calculategrade(80));
