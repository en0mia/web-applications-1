"use strict";
import sqlite from "sqlite3";

const db = new sqlite.Database("questions.sqlite", (err) => {
  if (err) throw err;
});

function get_users() {
  return new Promise((resolve, reject) =>
    db.all("SELECT * FROM user;", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    })
  );
}

get_users()
  .then((rows) => rows.forEach((r) => console.log(r)))
  .catch((err) => console.log(err));
