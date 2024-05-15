import "dayjs";
import { Col, Row } from "react-bootstrap/";

import { ListGroupItem } from "react-bootstrap";
import Rating from "./Rating";

function FilmEntry({ filmData }) {
  return (
    <ListGroupItem>
      <Row className="gy-2">
        <Col
          xs={6}
          xl={3}
          className="favorite-title d-flex gap-2 align-items-center"
        >
          {filmData.title}
          <div className="d-xl-none actions">
            <i className="bi bi-pencil"></i>
            <i className="bi bi-trash"></i>
          </div>
        </Col>
        <Col xs={6} xl={3} className="text-end text-xl-center">
          <span className="custom-control custom-checkbox">
            <span className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked={filmData.favorite}
              />
              <label className="custom-control-label">Favorite</label>
            </span>
          </span>
        </Col>
        <Col xs={4} xl={3} className="text-xl-center">
          {filmData.formatWatchDate()}
        </Col>
        <Col xs={8} xl={3} className="actions-container text-end">
          <div className="rating">
            <Rating rating={filmData.rating} maxStars={5}></Rating>
          </div>
          <div className="d-none d-xl-flex actions">
            <i className="bi bi-pencil"></i>
            <i className="bi bi-trash"></i>
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default FilmEntry;
