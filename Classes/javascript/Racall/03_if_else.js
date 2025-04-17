function preparebiryani (type){
    if(type === "Chicken Biryani"){
        console.log("Hyderbadi Birayni")
    }else{
        console.log("Prepare for Hyderbadi Biryani")
    }
}

preparebiryani("Chicken Biryani")
preparebiryani("Chicken Dum Biryani")


function calculateTotal (amount){
    // if(amount > 1000){
    //     return amount * 0.9
    // }
    // return amount    // This line acts as same like else {retrn amount}  

    return amount > 1000 ? amount * 0.9 : amount


}

console.log(calculateTotal(2000))


function trafficlight (color){
    switch (color) {
        case "red":
            console.log("Stop");
            break;
        case "Yellow":
            console.log("Start");
            break;
        case "Green":
            console.log("Go");
            break;
    
        default:
            console.log("Chalan Kaat Doo")
            break;
    }
}
trafficlight("red")

function checktruthyvalues (value){
    if(value){
        console.log("Truthy")
    }else{
        console.log("Truthy")
    }
}

checktruthyvalues(1)
checktruthyvalues(2)
checktruthyvalues("samir")
checktruthyvalues([])
checktruthyvalues([1,2,-3])
checktruthyvalues("")
checktruthyvalues({})


function login (username, password, loginIp ){
    if(username === "admin" && (password === "1234" || loginIp === "127")){
        console.log("Successful Loged In.")
    }else{
        console.log("Invalid Credentials");
        
    }
}

login("admin", "0","127")