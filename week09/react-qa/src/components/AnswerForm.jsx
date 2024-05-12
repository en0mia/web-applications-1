import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";

function AnswerForm(props) {
  const [text, setText] = useState(props.answer ? props.answer.text : "");
  const [email, setEmail] = useState(props.answer ? props.answer.email : "");
  const [date, setDate] = useState(
    props.answer ? props.answer.date.format("YYYY-MM-DD") : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const answer = {
      text,
      email,
      date,
    };
    props.addAnswer(answer);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const id = props.answer.id;
    const dateObject = dayjs(date);
    const answer = {
      id,
      text,
      email,
      date: dateObject,
    };
    props.editAnswer(answer);
  };

  return (
    <>
      <Form onSubmit={props.mode === "add" ? handleSubmit : handleEdit}>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            required={true}
            minLength={2}
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required={true}
            minLength={2}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          ></Form.Control>
        </Form.Group>
        {props.mode === "add" && (
          <Button variant="primary" type="submit">
            Add
          </Button>
        )}
        {props.mode === "edit" && (
          <Button variant="primary" type="submit">
            Save
          </Button>
        )}{" "}
        <Button variant="danger" onClick={props.cancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
}

export default AnswerForm;
