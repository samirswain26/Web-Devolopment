// Problem Statement:
// Create a ShoppingCart system where items can be added with a price. Implement a method getTotalPrice() that calculates the total price of all items in the cart.

// Challenge:
    // Implement a constructor function ShoppingCart that initializes an empty items array.
    // Attach addItem(price) to the prototype to add items.
    // Attach getTotalPrice() to calculate the total price of items.

function ShoppingCart() {
    // Initialize items property
    this.items = []
}
    
// Define addItem method on ShoppingCart's prototype
ShoppingCart.prototype.additem = function (...price){
    this.items.push(...price)
}
    
// Define getTotalPrice method on ShoppingCart's prototype
ShoppingCart.prototype.gettotalprice = function (){
    return this.items.reduce((total, price) => total + price, 0)
}

let add = new ShoppingCart()
add.additem(5,12,90)
console.log(add.gettotalprice());
