// Create a function that takes an array of item prices and returns the total cost.

function totalPrice(prices) {
  let add = 0;
  for (let i = 0; i < prices.length; i++){
    // add += prices[i]
    add = add + prices[i]
  }
  return add
}
console.log(totalPrice([5,10,15,0]));
