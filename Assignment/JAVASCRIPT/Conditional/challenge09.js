//  Write a function that uses switch-case to convert temperature (C to F and F to C).  


function convertTemperature(value, scale) {
    // Convert temperature based on the scale ("C" to "F" or "F" to "C")
    switch(scale){
      case "C":
        function ctof(c){
          return `"${(c* 9/5 )+32}°F"`
        }
        return ctof(value);
        case "F":
        function ftoc(f){
          return `"${(f - 32)* 5/9}°C"`
        }
        return ftoc(value)
    }
}
console.log(convertTemperature(39, "C"));
