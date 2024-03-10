// Exercise 1: Better Scores
"use strict";

const scores = [1, -5, 3, 2, 7, 8, -10, 10, 9, -7, 5, 4, -8];

const positiveScores = [];

for (const score of scores) {
    if (score >= 0) {
        positiveScores.push(score);
    }
}

// OR
// const positiveScores = scores.filter(score => score >= 0);

const NN = scores.length - positiveScores.length;

// NO because sort implement a string ordering!
// positiveScores.sort();

for (let repeat = 0; repeat < 2; repeat ++) {
    let posmin = 0;
    for (let i = 0; i < positiveScores.length; i++) {
        if (positiveScores[i] < positiveScores[posmin]) {
            posmin = i
        }
    }
    positiveScores.splice(posmin, 1);
}

console.log(positiveScores);

let avg = 0;

for (const score of positiveScores) {
    avg += score;
}

avg /= positiveScores.length;

for (let count = 0; count < NN +2; count ++) {
    positiveScores.push(Math.round(avg));
}

console.log(positiveScores);