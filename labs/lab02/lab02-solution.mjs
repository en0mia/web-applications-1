import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

function Film(
  id,
  title,
  isFavorite = false,
  watchDate = null,
  rating = 0,
  userId = 1
) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId;

  this.toString = () => {
    return (
      `Id: ${this.id}, ` +
      `Title: ${this.title}, Favorite: ${this.favorite}, ` +
      `Watch date: ${this.watchDate}, Score: ${this.rating}, ` +
      `User: ${this.userId}`
    );
  };
}

function FilmLibrary() {
  this.list = [];

  this.addNewFilm = (film) => {
    if (!this.list.some((f) => f.id == film.id)) this.list.push(film);
    else throw new Error("Duplicate id");
  };

  this.deleteFilm = (id) => {
    const newList = this.list.filter(function (film, index, arr) {
      return film.id !== id;
    });
    this.list = newList;
  };

  this.resetWatchedFilms = () => {
    this.list.forEach((film) => delete film.watchDate);
  };

  this.getRated = () => {
    const newList = this.list.filter(function (film, index, arr) {
      return film.rating > 0;
    });
    return newList;
  };

  this.sortByDate = () => {
    const newArray = [...this.list];
    newArray.sort((d1, d2) => {
      if (!d1.watchDate) return 1; // null/empty watchDate is the lower value
      if (!d2.watchDate) return -1;
      return d1.watchDate.diff(d2.watchDate, "day");
    });
    return newArray;
  };

  // DB exercises.
  // Common functions

  this.rowsToFilms = (rows) =>
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
    );

  // Exercise a.
  this.getAll = function () {
    const sql =
      "SELECT id, title, isFavorite, rating, watchDate, userId FROM films;";

    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(this.rowsToFilms(rows));
        }
      });
    });
  };

  // Exercise b.
  this.getFavorites = function () {
    const sql =
      "SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE isFavorite = 1;";

    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(this.rowsToFilms(rows));
        }
      });
    });
  };

  // Exercise c.
  this.getWatchedToday = function () {
    const today = dayjs();
    const sql =
      "SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE watchDate = ?;";

    return new Promise((resolve, reject) => {
      db.all(sql, [today.format("YYYY-MM-DD")], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(this.rowsToFilms(rows));
        }
      });
    });
  };

  // Exercise d.
  this.getWatchedBeforeDate = function (date) {
    const d = dayjs(date);
    const sql =
      "SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE watchDate < ?;";

    return new Promise((resolve, reject) => {
      db.all(sql, [d.format("YYYY-MM-DD")], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(this.rowsToFilms(rows));
        }
      });
    });
  };

  // Exercise e.
  this.getRatingGreaterOrEqual = function (rating) {
    const sql =
      "SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE rating >= ?;";

    return new Promise((resolve, reject) => {
      db.all(sql, [rating], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(this.rowsToFilms(rows));
        }
      });
    });
  };

  // Exercise f.
  this.getTitleContains = function (title) {
    const titleParam = "%" + title + "%";
    const sql =
      "SELECT id, title, isFavorite, rating, watchDate, userId FROM films WHERE title LIKE ?;";

    return new Promise((resolve, reject) => {
      db.all(sql, [titleParam], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(this.rowsToFilms(rows));
        }
      });
    });
  };

  // Part 2

  // Exercise a
  this.addToDb = function (film) {
    const sql =
      "INSERT INTO films(id, title, isFavorite, rating, watchDate, userId) VALUES (?, ?, ?, ?, ?, ?);";

    db.run(
      sql,
      [
        film.id,
        film.title,
        film.favorite,
        film.rating,
        film.watchDate,
        film.userId,
      ],
      (err) => {
        if (err) console.log(err);
        else console.log("Film with ID " + film.id + " added");
      }
    );
  };

  // Exercise b.
  this.deleteFromDb = function (id) {
    const sql = "DELETE FROM films WHERE id = ?;";

    db.run(sql, [id], (err) => {
      if (err) console.log(err);
      else console.log("Film with ID " + id + " removed");
    });
  };

  // Exercise c.
  this.deleteWatchDate = function () {
    const sql = "UPDATE films SET watchDate = NULL;";

    db.run(sql, [], (err) => {
      if (err) console.log(err);
      else console.log("Watch date removed");
    });
  };
}

function main() {
  // Creating some film entries
  const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
  const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
  const starWars = new Film(3, "Star Wars", false);
  const matrix = new Film(4, "Matrix", false);
  const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(pulpFiction);
  library.addNewFilm(grams21);
  library.addNewFilm(starWars);
  library.addNewFilm(matrix);
  library.addNewFilm(shrek);

  // Print Sorted films
  console.log("***** List of films (sorted) *****");
  const sortedFilms = library.sortByDate();
  sortedFilms.forEach((film) => console.log(film.toString()));

  // Deleting film #3
  library.deleteFilm(3);

  // Reset dates
  library.resetWatchedFilms();

  // Printing modified Library
  console.log("***** List of films *****");
  library.list.forEach((item) => console.log(item.toString()));

  // Retrieve and print films with an assigned rating
  console.log("***** Films filtered, only the rated ones *****");
  const ratedFilms = library.getRated();
  ratedFilms.forEach((film) => console.log(film.toString()));

  // Test DB
  const all = library.getAll();
  const fav = library.getFavorites();
  const watchedToday = library.getWatchedToday();
  const watchedBefore = library.getWatchedBeforeDate("2024-03-15");
  const rating = library.getRatingGreaterOrEqual(4);
  const title = library.getTitleContains("Pul");

  all.then((result) => {
    console.log("***** List of all films in DB *****");
    result.forEach((film) => console.log(film.toString()));
  });

  fav.then((result) => {
    console.log("***** List of all favorites in DB *****");
    result.forEach((film) => console.log(film.toString()));
  });

  watchedToday.then((result) => {
    console.log("***** List of all films watched today in DB *****");
    result.forEach((film) => console.log(film.toString()));
  });

  watchedBefore.then((result) => {
    console.log(
      "***** List of all films watched before 2024-03-15 in DB *****"
    );
    result.forEach((film) => console.log(film.toString()));
  });

  rating.then((result) => {
    console.log("***** List of all films with rating >= 4 in DB *****");
    result.forEach((film) => console.log(film.toString()));
  });

  title.then((result) => {
    console.log("***** List of all films whose title contains Pul in DB *****");
    result.forEach((film) => console.log(film.toString()));
  });

  // DB second part
  const filmToAdd = new Film(50, "New film", true, "2024-03-12", 4);

  library.addToDb(filmToAdd);
  library.deleteFromDb(1);
  library.deleteWatchDate();
}

main();
