// Exercise 2: My Users list
"use strict";

const users = "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Luca Pezzolla";
const userArray = users.split(",");
const acronyms = [];
for (let i = 0; i < userArray.length; i++) {
    userArray[i] = userArray[i].trim();

    const pieces = userArray[i].split(" ");
    let acronym = "";
    for (const name of pieces) {
        acronym += name.trim()[0];
    }
    acronyms.push(acronym.toUpperCase());
}

console.log(acronyms.sort());
console.log(userArray);