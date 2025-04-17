let Heros = ["Iron Man", "Spider Man", "Captain America", "Thor"]

console.log(Heros[0]);
console.log(Heros.length);

Heros.push("Captain Marvel")
// console.log(Heros);

let del =  Heros.pop()
console.log(del)        //The output is :- Del the array list except the push element.
 
let index = Heros.indexOf("ThorR")
console.log(index);

if(index != -1){
    Heros.splice(index, 1)
}
console.log(Heros)

Heros.forEach((app, index)=>{
    console.log(`${index + 1} : ${app}`)
})


let Dcheros = ["Super Mam", "Batman"]

let allheros = Heros.concat(Dcheros)
console.log(allheros);

let newtype = [...Heros, "hulk"]
console.log(newtype);


let menu = {
    name: "biryani",
    ingredients : {
        Rice : "Deradun Rice",
        Chicken : "Large Size Peaces",
        Oil : "Refined",
        Spices : ["Daalchini", "ginger", "Onion", "Garlic"]
    },
    Instruction : "Make this in a low flame"
}

console.log(menu.name)
console.log(menu.ingredients.Spices[3])

let updatedmenu = {
    ...menu,
    Instruction: "MAke it faster"
}

console.log(updatedmenu);

let {name, ingredients} = menu
let [marvelheros,  dcheros] = allheros

console.log(ingredients);
console.log(dcheros);
