"use strict";

// Boilerplate
function Film(
  id,
  title,
  isFavorite = false,
  watchDate = null,
  rating = null,
  userId = 1
) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId;

  // Filters
  this.isBestRated = () => this.rating === 5;

  this.isSeenLastMonth = () => {
    if (!this.watchDate) return false; // no watchDate
    const diff = dayjs().diff(this.watchDate, "month", true);

    return diff >= 0 && diff < 1;
  };

  this.isUnseen = () => !this.watchDate;

  this.formatWatchDate = (format = "MMMM D,YYYY") => {
    return this.watchDate ? this.watchDate.format(format) : undefined;
  };
}

function FilmLibrary() {
  this.list = [];

  this.addNewFilm = (film) => {
    if (!this.list.some((f) => f.id === film.id)) this.list.push(film);
    else throw new Error("Duplicate id");
  };

  this.deleteFilm = (id) => {
    const newList = this.list.filter(function (film, index, arr) {
      return film.id !== id;
    });
    this.list = newList;
  };

  // The filter methods create a new array with the elements that pass the test implemented by the provided function
  this.filterAll = () => {
    return this.list.filter(() => true);
  };

  this.filterByFavorite = () => {
    return this.list.filter((film) => film.favorite === true);
  };

  this.filterByBestRated = () => {
    return this.list.filter((film) => film.isBestRated());
  };

  this.filterBySeenLastMonth = () => {
    return this.list.filter((film) => film.isSeenLastMonth());
  };

  this.filterByUnseen = () => {
    return this.list.filter((film) => film.isUnseen());
  };
}

// Exercise 1
const INITIAL_FILMS = [
  // Data Structure: id, title, favorite, watchDate, rating
  [1, "Pulp Fiction", true, "2024-04-10", 5],
  [2, "21 Grams", true, "2024-04-17", 4],
  [3, "Star Wars", false],
  [4, "Matrix", true],
  [5, "Shrek", false, "2024-04-21", 3],
];

const library = new FilmLibrary();

// Populate library
INITIAL_FILMS.forEach((element) => library.addNewFilm(new Film(...element)));

const filmsTable = document.getElementById("filmTable");
const tableBody = filmsTable.getElementsByTagName("tbody")[0];

function createFilmHTML(film) {
  const filmNode = document.createElement("tr");
  let ratingFullStars = "";
  let ratingEmptyStars = "";

  for (let i = 0; i < film.rating; i++) {
    ratingFullStars += `<i class="bi bi-star-fill"></i>`;
  }

  for (let i = 0; i < 5 - film.rating; i++) {
    ratingEmptyStars += `<i class="bi bi-star"></i>`;
  }

  const nodeContent = `
    <tr>
        <td>${film.title}</td>
        <td><i class="bi bi-check-lg"></i> Favorite</td>
        <td>${film.watchDate || ""}</td>
        <td>
        ${ratingFullStars}
        ${ratingEmptyStars}
        </td>
        <td>
        <i class="bi bi-pencil-square"></i>
        <i class="bi bi-trash" onclick="deleteFilm(${film.id})"></i>
        </td>
    </tr>
  `;

  filmNode.innerHTML = nodeContent;
  return filmNode;
}

function createFilms(films) {
  films.forEach((element) => {
    const node = createFilmHTML(element);
    tableBody.appendChild(node);
  });
}

createFilms(library.list);

// Exercise 2
const sidebar = document.getElementById("sidebar");

const FILTER_IDS = [
  { id: "filter-all", provider: library.filterAll },
  { id: "filter-favorites", provider: library.filterByFavorite },
  { id: "filter-best-rated", provider: library.filterByBestRated },
  { id: "filter-seen-last-month", provider: library.filterBySeenLastMonth },
  { id: "filter-unseen", provider: library.filterByUnseen },
];

FILTER_IDS.forEach((filter) => {
  document
    .getElementById(filter.id)
    .addEventListener("click", (event) =>
      handleFilterFilms(filter.id, filter.provider)
    );
});

function clearTable() {
  tableBody.innerHTML = "";
}

function handleFilterFilms(elementId, provider) {
  for (const filter of sidebar.children) {
    filter.classList.remove("selected-filter");
  }
  document.getElementById(elementId).classList.add("selected-filter");
  clearTable();
  createFilms(provider());
}

// Exercise 3
function deleteFilm(id) {
  library.deleteFilm(id);
  clearTable();
  createFilms(library.list);
}
