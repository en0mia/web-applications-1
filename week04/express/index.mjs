"use strict";
import express from "express";
import morgan from "morgan";

const app = express();

// Register the middlewares
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello world!!"));

app.listen(3000, () => {
  console.log("Application started!");
});
