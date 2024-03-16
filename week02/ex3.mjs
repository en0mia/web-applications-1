"use strict";

import dayjs from "dayjs";

function Answer(response, username, score, date) {
    this.response = response;
    this.username = username;
    this.score = score;
    this.date = date;

    this.voteUp = () => {this.score ++;}

    this.getCategory = () => {return this.category;}
}

function Question(question, username, date) {
    this.question = question;
    this.username = username;
    this.date = date;
    this.answers = [];

    this.add = (answer) => {this.answers.push(answer);}

    this.find = (user) => this.answers.filter(answer => answer.username === user);

    this.afterDate = (date) => this.answers.filter(answer => (answer.date.isSame(date) || answer.date.isAfter(date)));

    this.listByDate = () => [... this.answers].sort((a1, a2) => a1.date.valueOf() - a2.date.valueOf());

    this.listByScore = () => [... this.answers].sort((a1, a2) => a1.score > a2.score);
}

const a1 = new Answer('Yes', 'simone', 5, dayjs('2024-03-12'));
const a2 = new Answer('No', 'fulvio', 10, dayjs('2025-03-12'));
const q1 = new Question('Are you happy?', 'simone', dayjs('2024-03-12'), []);

q1.add(a1);
q1.add(a2);