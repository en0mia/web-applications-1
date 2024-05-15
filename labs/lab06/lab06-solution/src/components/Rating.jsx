function Rating({ maxStars, rating }) {
  return [...Array(maxStars)].map((element, index) => (
    <i
      key={index}
      className={index < rating ? "bi bi-star-fill" : "bi bi-star"}
    ></i>
  ));
}

export default Rating;
