let salesData = [
    {product: "laptop", price: 6000},
    {product: "Tablet", price: 4000},
    {product: "Phone", price: 2000},
    {product: "Keyboard", price: 800}
]

let totalsale = salesData.reduce((acc, add)=> acc + add.price , 0)
console.log(totalsale);



let userActivity = [
    {user: "Samir", activitycount: 56},
    {user: "sam", activitycount: 70},
    {user: "jeet", activitycount: 52},
]
//Finding the mostActiveUser using reduce method.
let activeuser = userActivity.reduce((accum, crntval)=> 
crntval.activitycount > accum.activitycount ? crntval : accum
)
console.log(activeuser);



// Find the low stock item using Filter
let stackitems = [
    { name: "widget A", stock: 140 }, 
    { name: "widget b", stock: 40 } ,
    { name: "widget c", stock: 240 } 
]

let lowstockitem = stackitems.filter((item) => {
    return item.stock < 50
    // using {} braces we have use return outherwise it will return an empty array.
})
// Filter method give an array in the output. 
console.log(lowstockitem);
