"use strict";
import morgan from "morgan";
import express from "express";
import {
  getBestFilms,
  getFavoriteFilms,
  getFilms,
  getUnseenFilms,
  getSeenLastMonth,
  getFilm,
  addFilm,
  updateFilm,
  deleteFilm,
} from "./dao.mjs";
import { Film } from "./FilmModel.mjs";
import { param, validationResult, body } from "express-validator";
import { validationMiddleware } from "./middlewares.mjs";

const app = express();

app.use(morgan("common"));
app.use(express.json());

app.get("/films", (req, res) => {
  getFilms().then((films) => res.json(films));
});

app.get("/films/favorite", (req, res) => {
  getFavoriteFilms().then((films) => res.json(films));
});

app.get("/films/best", (req, res) => {
  getBestFilms().then((films) => res.json(films));
});

app.get("/films/lastMonth", (req, res) => {
  getSeenLastMonth().then((films) => res.json(films));
});

app.get("/films/unseen", (req, res) => {
  getUnseenFilms().then((films) => res.json(films));
});

app.get(
  "/films/:id",
  [param("id").isInt(0), validationMiddleware],
  (req, res) => {
    getFilm(req.params.id).then((film) => res.json(film));
  }
);

app.post(
  "/films",
  [
    body("title").notEmpty(),
    body("isFavorite").isIn([0, 1]),
    body("rating").isInt(0, 5),
    body("watchDate").isDate(),
    body("userId").isInt(),
    validationMiddleware,
  ],
  (req, res) => {
    const film = new Film(
      null,
      req.body.title,
      req.body.isFavorite,
      req.body.rating,
      req.body.watchDate,
      req.body.userId
    );
    addFilm(film)
      .then(() => {
        res.status(201);
        res.send();
      })
      .catch((err) => {
        res.status(500);
        res.send("DB error: " + err);
      });
  }
);

app.put(
  "/films/:id",
  [param("id").isInt(0), validationMiddleware],
  (req, res) => {
    const film = new Film(
      req.params.id,
      req.body.title,
      req.body.isFavorite,
      req.body.rating,
      req.body.watchDate,
      req.body.userId
    );
    updateFilm(film)
      .then(() => {
        res.json(film);
      })
      .catch((err) => {
        res.status(500);
        res.send("DB error: " + err);
      });
  }
);

app.put(
  "/films/:id/rating/:rating",
  [param("id").isInt(0), param("rating").isInt(0, 5), validationMiddleware],
  (req, res) => {
    const film = getFilm(req.params.id);
    const updated = film.then((f) => {
      f.rating = req.params.rating;
      updateFilm(f)
        .then(() => {
          res.json(film);
        })
        .catch((err) => {
          res.status(500);
          res.send("DB error: " + err);
        });
    });
    updated.catch((err) => {
      res.status(500);
      res.send("DB error: " + err);
    });
  }
);

app.put(
  "/films/:id/isFavorite/:isFavorite",
  [
    param("id").isInt(0),
    param("isFavorite").isIn([0, 1]),
    validationMiddleware,
  ],
  (req, res) => {
    const film = getFilm(req.params.id);
    const updated = film.then((f) => {
      f.isFavorite = req.params.isFavorite;
      updateFilm(f)
        .then(() => {
          res.json(film);
        })
        .catch((err) => {
          res.status(500);
          res.send("DB error: " + err);
        });
    });
    updated.catch((err) => {
      res.status(500);
      res.send("DB error: " + err);
    });
  }
);

app.delete(
  "/films/:id",
  [param("id").isInt(0), validationMiddleware],
  (req, res) => {
    deleteFilm(req.params.id)
      .then(() => {
        res.status(200);
        res.send("Film with id " + req.params.id + " deleted");
      })
      .catch((err) => {
        res.status(500);
        res.send("DB error: " + err);
      });
  }
);

app.listen(3000, () => {
  console.log("Running application");
});
