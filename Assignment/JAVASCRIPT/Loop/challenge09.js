// You've been tasked with designing the perfect shiny diamond rug crush's room. They love stars, and you've decided to make a sparkling pattern using them. 
// You need to help them create this rug, where the stars are arranged in the shape of the diamond!


// Cretae a function shinyDiamondRug(n) that points a shiny diamond shape made of stars. 
// The number n represents the size of the diamond, with the middle of the diamond having 2n-1 stars.


// Rule:-
// -> Each line must have trailing spaces.
// -> The output must not have an extra newline at the end.

// For example: For n = 4, the output will look like:
/* 
        *
       ***
      *****
    *********
      *****
       ***
        *       
*/

// function shinyDiamondRug(n) {
//     const lines = [];
  
//     // Top part including the middle line
//     for (let i = 1; i <= n; i++) {
//       const spaces = ' '.repeat(n - i);
//       const stars = '*'.repeat(2 * i - 1);
//       lines.push(spaces + stars);
//     }
  
//     // Bottom part (mirror of top part excluding middle)
//     for (let i = n - 1; i >= 1; i--) {
//       const spaces = ' '.repeat(n - i);
//       const stars = '*'.repeat(2 * i - 1);
//       lines.push(spaces + stars);
//     }
  
//     // Join all lines with \n and return
//     return lines.join('\n');
//   }

//   console.log(shinyDiamondRug(4));






  function shinyDiamondRug(n) {
    let Diamond = "";
  
    // Upper Part of the diamond (including the middle line)
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n - i; j++) {
        Diamond += " "; // Add spaces before the stars
      }
      for (let k = 1; k <= 2 * i - 1; k++) {
        Diamond += "*"; // Add stars
      }
      if (i !== n || n === 1) Diamond += "\n"; // Add newline if it's not the last line
    }
  
    // Lower Part of the diamond
    for (let i = n - 1; i >= 1; i--) {
      Diamond += "\n"; // Newline for the start of this row
      for (let j = 1; j <= n - i; j++) {
        Diamond += " "; // Add spaces
      }
      for (let k = 1; k <= 2 * i - 1; k++) {
        Diamond += "*"; // Add stars
      }
    }
  
    return Diamond;
  }
  
  console.log(shinyDiamondRug(4));
  