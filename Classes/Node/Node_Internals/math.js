// Exports is of two types that is "name exports" that exports is with a particular name and we can use "Module" to export those items.
// Per file only one Default exports but any number of named exports.

const add = function(a,b){
    return a+b
}

const sub = function(a,b){
    return a-b
}

const multiply = function(a,b){
    return a*b
}


// Default Exports 

module.exports = {
    add,
    sub,
    multiply
}


// exports.samir = "I am a good person"