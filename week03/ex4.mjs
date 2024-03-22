"use strict";
import sqlite from "sqlite3";
import dayjs from "dayjs";

const db = new sqlite.Database("questions.sqlite", (err) => {
  if (err) throw err;
});

function Answer(response, username, score, date) {
  this.response = response;
  this.username = username;
  this.score = score;
  this.date = date;

  this.voteUp = () => {
    this.score++;
  };

  this.getCategory = () => {
    return this.category;
  };
}

function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);

  this.toString = () => {
    return `Question '${this.text}' asked by ${
      this.email
    } on ${this.date.format("YYYY-MM-DD")}`;
  };
}

function QuestionList() {
  this.getQuestion = function (questionId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT q.id, q.text, u.email, q.date 
        FROM question q, "user" u 
        WHERE q.id=? and q.authorId = u.id;`;

      db.get(sql, [questionId], (err, row) => {
        if (err) reject(err);
        else {
          resolve(new Question(row.id, row.text, row.email, row.date));
        }
      });
    });
  };

  this.emailToAuthorId = function (email) {
    const sql = "SELECT id FROM user WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row.id);
      });
    });
  };

  this.addQuestion = function (question) {
    const sql = `INSERT INTO question(id, text, authorId, date) VALUES (?, ?, ?, ?);`;

    this.emailToAuthorId(question.email).then(
      (authorId) =>
        new Promise((resolve, reject) => {
          db.run(
            sql,
            [
              question.id,
              question.text,
              authorId,
              question.date.format("YYYY-MM-DD"),
            ],
            (err) => {
              if (err) reject(err);
              else resolve(true);
            }
          );
        })
    );
  };
}

const qList = new QuestionList();
const q1 = qList.getQuestion(1);
q1.then((r) => console.log(r));
const qAdd = new Question(10, "text", "luca.mannella@polito.it", "2024-03-21");
qList.addQuestion(qAdd);
