// create a function that takes an array of days (eg.["Monday", "Tuesday", "Friday"]) and retuen the number of days you're working. "Saturday" and "Sunday" are not working days.

function workingDays(days){
    let day = 0
    for (let i = 0; i < days.length; i++){
        if(days[i] !== "Saturday" && days[i] !== "Sunday"){
            day++
        }
    }

    return day

}
console.log(workingDays(["Monday", "Tuesday"])); 