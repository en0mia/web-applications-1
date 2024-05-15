import { ListGroup } from "react-bootstrap";
import FilmEntry from "./FilmEntry";

function FilmList(props) {
  const { films } = props;

  return (
    <ListGroup id="films-list" variant="flush">
      {films.map((film) => (
        <FilmEntry filmData={film} key={film.id}></FilmEntry>
      ))}
    </ListGroup>
  );
}

export default FilmList;
