let p1 = {
    fname: "samir",
    lmane: "Swain",
    address: {
        area: "a",
        pin: 1,
        housenumber: 21
    }
}

let p2 = {
    ...p1,   //Spread operator (...) / Shallow copy
    address:{
        ...p1.address
    }
}

const p1tostring = JSON.stringify(p1)
console.log(p1tostring);
console.log(typeof p1tostring);
let p3 = JSON.parse(p1tostring)
console.log(p3);


p2.fname = "jitu"
p2.address.pin = 9


console.log(p1);
console.log(p2);