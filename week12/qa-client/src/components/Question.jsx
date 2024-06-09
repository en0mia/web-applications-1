import { Container, Col, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";

function QuestionComponent(props) {
  const params = useParams();
  const number = params.qid;

  const question = props.questions.filter((q) => q.id == number)[0];
  const text = question ? question.text : "";
  const email = question ? question.email : "";

  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            <p>{number}</p>
          </Col>
          <Col md={6}>
            <p>{text}</p>
          </Col>
          <Col md={4}>
            <p>{email}</p>
          </Col>
        </Row>
      </Container>
      <Outlet></Outlet>
    </>
  );
}

export default QuestionComponent;
