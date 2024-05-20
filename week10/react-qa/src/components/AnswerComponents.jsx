import { Row, Col, Table, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { ArrowUp, PencilSquare, Trash } from "react-bootstrap-icons";
import { useContext, useState } from "react";
import AnswerForm from "./AnswerForm";
import LanguageContext from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

function Answers(props) {
  const [mode, setMode] = useState("default");
  const [editableAnswer, setEditableAnswer] = useState();
  const language = useContext(LanguageContext);
  const navigate = useNavigate();
  const handleEdit = (answer) => {
    setEditableAnswer(answer);
    setMode("edit");
  };
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable
            answers={props.answers}
            deleteAnswer={props.deleteAnswer}
            voteUp={props.voteUp}
            handleEdit={handleEdit}
          ></AnswerTable>
        </Col>
      </Row>
      {mode === "add" && (
        <AnswerForm
          addAnswer={(answer) => props.addAnswer(answer)}
          mode={mode}
          cancel={() => setMode("default")}
        ></AnswerForm>
      )}
      {mode === "edit" && (
        <AnswerForm
          editAnswer={(answer) => props.editAnswer(answer)}
          mode={mode}
          answer={editableAnswer}
          cancel={() => setMode("default")}
        ></AnswerForm>
      )}
      {mode === "default" && (
        <Button
          variant="primary"
          onClick={() => {
            navigate("add");
          }}
        >
          {language == "IT" ? "Aggiungi" : "Add"}
        </Button>
      )}
    </>
  );
}

Answers.propTypes = {
  answers: PropTypes.array,
};

function AnswerTable(props) {
  const [sortOrder, setSortOrder] = useState("none");
  const sortByScore = () => {
    setSortOrder((oldOrder) => (oldOrder === "asc" ? "desc" : "asc"));
  };
  const sortedAnswers = [...props.answers];

  if (sortOrder === "asc") {
    sortedAnswers.sort((a1, a2) => a1.score - a2.score);
  } else if (sortOrder === "desc") {
    sortedAnswers.sort((a1, a2) => a2.score - a1.score);
  }
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>
              Score{" "}
              <Button variant="link" onClick={sortByScore}>
                Sort
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAnswers.map((ans) => (
            <AnswerRow
              answer={ans}
              key={ans.id}
              deleteAnswer={props.deleteAnswer}
              voteUp={props.voteUp}
              handleEdit={props.handleEdit}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

AnswerTable.propTypes = {
  answers: PropTypes.array,
};

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerActions
        deleteAnswer={props.deleteAnswer}
        voteUp={props.voteUp}
        id={props.answer.id}
        handleEdit={props.handleEdit}
        answer={props.answer}
      />
    </tr>
  );
}

AnswerRow.propTypes = {
  answer: PropTypes.object,
};

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

AnswerData.propTypes = {
  answer: PropTypes.object,
};

function AnswerActions(props) {
  return (
    <td>
      <Button
        variant="warning"
        onClick={() => {
          props.voteUp(props.id);
        }}
      >
        <ArrowUp />
      </Button>
      <Button
        variant="primary"
        className="mx-1"
        onClick={() => {
          props.handleEdit(props.answer);
        }}
      >
        <PencilSquare />
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          props.deleteAnswer(props.id);
        }}
      >
        <Trash />
      </Button>
    </td>
  );
}

export { Answers };
