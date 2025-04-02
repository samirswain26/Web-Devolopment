const obj1 = {
    fname: "Samir",
    lname: "swain",
    getfullname: function(){
        if(this.lname !== Boolean)return `${this.fname} kumar ${this.lname}`
        else{
            return `${this.fname}`
        }
    }
}

const obj2 = {
    fname : "Jitu",
    lname : "swain"
}

obj2.__proto__ = obj1

console.log(obj1.getfullname());
console.log(obj2.getfullname());
