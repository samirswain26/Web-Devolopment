// Cretae a function that removes unhealthy food items (those containing "Burger") and returns uploaded list.

function filterHealthy(foodList) {
    foodList.filter((item) => item !== ("Burger"))
    return foodList
}

let fodlist = ["salad", "Burger", 'Bananna', "Pizza"]
let a =fodlist.filter((item) => item !== ("Burger"))
console.log(a);
