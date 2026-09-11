"use strict";
/**
 * description: This is a sample JavaScript file that demonstrates basic arithmetic operations and logging to the console.
 */

;
// comments
{
  const sum = 2 + 2;
  console.log(sum);
}

window.foo = "Hello, Bar!";

function addNumbers(x, y) {
  return x + y;
}

console.log(addNumbers(2, 2));

// const a = 12;
// const b = 2;
// const B = 66;
// a = 77;
// console.log(a + B + b);

// window.alert(window.foo);
// alert("Hello, World!");
// confirm("Are you sure you want to proceed?");

// prompt("Please enter your name:", "John Doe");

let a = prompt("Please enter first number:", "10");
let b = prompt("Please enter second number:", "10");
let operation = prompt("Please enter operation (+, -, *, /):", "+");

if (operation === "+") {
  console.log(addNumbers(Number(a), Number(b)));
} else if (operation === "-") {
  console.log(Number(a) - Number(b));
} else if (operation === "*") {
  console.log(Number(a) * Number(b));
} else if (operation === "/") {
  if (Number(b) !== 0) {
    console.log(Number(a) / Number(b));
  } else {
    console.log("Error: Division by zero is not allowed.");
  }
} else {
  console.log("Invalid operation. Please enter one of +, -, *, /.");
}   


// switch (operation) {
//   case "+":
//     console.log(addNumbers(Number(a), Number(b)));
//     break;
//   case "-":
//     console.log(Number(a) - Number(b));
//     break;
//   case "*":
//     console.log(Number(a) * Number(b));
//     break;
//   case "/":
//     if (Number(b) !== 0) {
//       console.log(Number(a) / Number(b));
//     } else {
//       console.log("Error: Division by zero is not allowed.");
//     }
//     break;
//   default:
//     console.log("Invalid operation. Please enter one of +, -, *, /.");
// }
// console.log(addNumbers(Number(a), Number(b)));