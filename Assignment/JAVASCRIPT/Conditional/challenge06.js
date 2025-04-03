/*  Q.  Write a function that uses switch-case to return the correct action.
Red - "Stop"
Yellow - "Slow Down"
Green - "Go"
Blue - "Invalid Color" */


function trafficLightAction(color) {
    // Return "Stop", "Slow Down", or "Go" based on the traffic light color
    switch(color){
      case "Red":
      if("Red" === "Red")
      return "Stop"
        break; 
      case "Yellow":
      if("Yellow" === "Yellow")
        return "Slow Down"
        break; 
      case "Green":
      if("Green" === "Green")
        return "Go"
        break; 
      case "Blue":
      if("Blue" === "Blue")
        return "Invalid color"
        break; 
    }
  }
console.log(trafficLightAction("Red"));

