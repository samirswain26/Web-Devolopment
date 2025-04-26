
// console.log(arr[-1])

// negativeIndex(arr, -1)

let user = {
    name: "samir",
    age: 23,
    password: 1234
}

let proxyUser = new Proxy(user, {
    get(target, property){
        // console.log(target)
        if(property === "password"){
            throw new Error("Access Denied")
        }
        console.log(property)
        return target[property]
    }
})
// console.log(proxyUser.password);

let arr = [1,2,3,4,,5,6,7,8,9,10]

function negativeIndex(arr){
    return new Proxy(arr, {
        get(target, property){
            const index = Number(property)
            if(index < 0){
                return target[target.length + index]
            }
            return target[index]
        },
        set(target, property, value){
            const index = Number(property)
            if(index < 0){
                target[target.length + index] = value
            }else{
                target[index] = value
            }
            return true
        }
    })
}
let newArr = negativeIndex(arr)
console.log(arr[-1]);
console.log(newArr[-1]);
newArr[-2] = 22;
console.log(newArr)
console.log(arr)
