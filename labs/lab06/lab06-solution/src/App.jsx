import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import Filters from "./components/Filters";
import { Collapse, Container, Row, Col, Button } from "react-bootstrap";
import FilmList from "./components/FilmList";
import { INITIAL_FILMS } from "./films.mjs";
import dayjs from "dayjs";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const filters = {
    "filter-all": {
      label: "All",
      id: "filter-all",
      filterFunction: () => true,
    },
    "filter-favorite": {
      label: "Favorites",
      id: "filter-favorite",
      filterFunction: (film) => film.favorite,
    },
    "filter-best": {
      label: "Best Rated",
      id: "filter-best",
      filterFunction: (film) => film.rating >= 5,
    },
    "filter-lastmonth": {
      label: "Seen Last Month",
      id: "filter-lastmonth",
      filterFunction: (film) => {
        if (!film?.watchDate) return false;
        const diff = film.watchDate.diff(dayjs(), "month");
        return diff <= 0 && diff > -1;
      },
    },
    "filter-unseen": {
      label: "Unseen",
      id: "filter-unseen",
      filterFunction: (film) => !film?.watchDate,
    },
  };
  const [activeFilter, setActiveFilter] = useState("filter-all");
  const visibleFilms = INITIAL_FILMS.filter(
    filters[activeFilter].filterFunction
  );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <CustomNavbar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      ></CustomNavbar>
      <Container fluid className="flex-grow-1 d-flex flex-column">
        <Row className="flex-grow-1">
          <Collapse
            id="films-filters"
            in={isExpanded}
            className="col-md-3 bg-light d-md-block"
          >
            <div className="py-4">
              <h5 className="mb-3">Filters</h5>
              <Filters
                items={filters}
                selected={activeFilter}
                onSelect={setActiveFilter}
              />
            </div>
          </Collapse>
          <Col md={9} className="pt-3">
            <h1>
              <span id="filter-title">{filters[activeFilter].label}</span> films
            </h1>
            <FilmList films={visibleFilms}></FilmList>
          </Col>
        </Row>
        <Button variant="primary" className="rounded-circle fixed-right-bottom">
          <i className="bi bi-plus"></i>
        </Button>
      </Container>
    </div>
  );
}

export default App;
