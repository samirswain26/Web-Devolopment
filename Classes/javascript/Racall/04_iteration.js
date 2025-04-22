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
let activeuser = userActivity.reduce((accum, currentvalue)=> 
    currentvalue.activitycount > accum.activitycount ? currentvalue : accum
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



let expenses = [
    {description: "Groceries", amount: 50, category: "Food", Rate: 30},
    {description: "Electricity Bill", amount: 100, category: "utilities",Rate: 300 },
    {description: "Dinner", amount: 30, category: "Food", Rate: 1000},
    {description: "Intenet Bill", amount: 50, category: "utilities", Rate: 590},
    {description: "Book", amount: 50, category: "Study", Rate: 30}
];

let expenseReport = expenses.reduce((accum, curval) => {
    accum[curval.category] += curval.amount
    // accum[curval.category] += curval.Rate
    return accum
}, {Food: 0, utilities: 0, Study: 0})

console.log("Expense Report", expenseReport);




// Solve this problem in a sorted way according to the prioprity the task is completed or not.
let tasks = [
    {description: "Write Report", completed: false, priority: 2},
    {description: "Write Code", completed: false, priority: 2},
    {description: "Send mail", completed: true, priority: 9},
    {description: "Prepare Presentation", completed: false, priority: 6},
]

let pendingSortedTasks = tasks
    .filter((task) => {return !task.completed})
    .sort((a, b) => a.priority - b.priority)   // Sorts them by increasing priority

console.log(pendingSortedTasks);



// Find the avergae movie ratings for each movie.
let moviratings = [
    {title: "Movie A", ratings: [4,5,3]},
    {title: "Movie B", ratings: [5,5,4]},
    {title: "Movie C", ratings: [3,4,2]},
]

 let averageratings = moviratings.map((add) => {
    let total =  add.ratings.reduce((accum, curval) => accum + curval,  0 )
    let average = total / add.ratings.length
    add.ratings = average
    return add
    return {title: add.title, averageratings: average.toFixed(1) }
 })
 console.log(averageratings);
 