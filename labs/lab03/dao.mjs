import sqlite from "sqlite3";
import { Film } from "./FilmModel.mjs";
import dayjs from "dayjs";

// open the database
const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

export const getFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films;";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(
          rows.map(
            (row) =>
              new Film(
                row.id,
                row.title,
                row.isFavorite,
                row.rating,
                row.watchDate,
                row.userId
              )
          )
        );
      }
    });
  });
};

export const getFavoriteFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE isFavorite = 1;";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(
          rows.map(
            (row) =>
              new Film(
                row.id,
                row.title,
                row.isFavorite,
                row.rating,
                row.watchDate,
                row.userId
              )
          )
        );
      }
    });
  });
};

export const getBestFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE rating = 5;";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(
          rows.map(
            (row) =>
              new Film(
                row.id,
                row.title,
                row.isFavorite,
                row.rating,
                row.watchDate,
                row.userId
              )
          )
        );
      }
    });
  });
};

export const getSeenLastMonth = () => {
  return new Promise((resolve, reject) => {
    const startDate = dayjs().subtract(1, "months").format("YYYY-MM-DD");
    const sql = "SELECT * FROM films WHERE watchDate >= ?;";
    db.all(sql, [startDate], (err, rows) => {
      if (err) reject(err);
      else {
        resolve(
          rows.map(
            (row) =>
              new Film(
                row.id,
                row.title,
                row.isFavorite,
                row.rating,
                row.watchDate,
                row.userId
              )
          )
        );
      }
    });
  });
};

export const getUnseenFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE watchDate IS NULL;";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(
          rows.map(
            (row) =>
              new Film(
                row.id,
                row.title,
                row.isFavorite,
                row.rating,
                row.watchDate,
                row.userId
              )
          )
        );
      }
    });
  });
};

export const getFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE id = ?;";
    db.get(sql, id, (err, row) => {
      if (err) reject(err);
      else {
        resolve(
          new Film(
            row.id,
            row.title,
            row.isFavorite,
            row.rating,
            row.watchDate,
            row.userId
          )
        );
      }
    });
  });
};

export const addFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO films (title, isFavorite, rating, watchDate, userId) VALUES (?, ?, ?, ?, ?);";
    db.run(
      sql,
      [film.title, film.isFavorite, film.rating, film.watchDate, film.userId],
      (err) => {
        if (err) reject(err);
        else {
          resolve(true);
        }
      }
    );
  });
};

export const updateFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE films SET title = ?, isFavorite = ?, rating = ?, watchDate = ?, userId = ? WHERE id = ?;";
    db.run(
      sql,
      [
        film.title,
        film.isFavorite,
        film.rating,
        film.watchDate,
        film.userId,
        film.id,
      ],
      (err) => {
        if (err) reject(err);
        else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM films WHERE id = ?;";
    db.run(sql, [id], (err) => {
      if (err) reject(err);
      else {
        resolve(true);
      }
    });
  });
};
