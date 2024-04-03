function Film(id, title, isFavorite, rating, watchDate, userId) {
  this.id = id;
  this.title = title;
  this.isFavorite = isFavorite;
  this.rating = rating;
  this.watchDate = watchDate;
  this.userId = userId;
}

function User(id, email, name, hash, salt) {
  this.id = id;
  this.email = email;
  this.name = name;
  this.hash = hash;
  this.salt = salt;
}

export { Film, User };
