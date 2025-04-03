//  Write a function that checks if a person is eligible to vote and returns "Eligible" or "Not Eligible"

function checkvotingEligibility(age){
    if(age >= 18){
        return "Eligible"
    }else{
        return "Not Eligible"
    }
}
console.log(checkvotingEligibility(33));
