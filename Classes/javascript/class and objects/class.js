class person{
    constructor(fname, lname){
        this.fname = fname
        this.lname = lname

        this.isloggedin = false
    }

    getfullname(){
        return `${this.fname} ${this.lname}`
    }
}

obj1 = new person("samir", "swain")
obj2 = new person("samir kumar", "swain")

console.log(obj1.getfullname());
console.log(obj2.getfullname());
console.log(obj1.isloggedin)



// Using Inheritace  (By using Extend Keyword)

class A {
    functioninsideA(){
        return `A`
    }
}
class B extends A{
    functioninsideB(){ return `B`
    }
}

const p = new B
console.log(p.functioninsideA());
console.log(p.functioninsideB());




// Not Using Extend keywords

class C {
    functioninsideC(){
        return `C`
    }
}
class D{
    functioninsideD(){ return `D`
    }
}

Object.setPrototypeOf(C.prototype, D.prototype);
const q = new C()
console.log(q.functioninsideD());
