import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import QuestionComponent from "./components/Question";
import { Question, Answer } from "./QAModels.mjs";
import { Answers } from "./components/AnswerComponents";
import { Like } from "./components/Like";
import { useState } from "react";
import LanguageContext from "./contexts/LanguageContext";
import { Route, Routes, Link } from "react-router-dom";
import AnswerForm from "./components/AnswerForm";
import QuestionList from "./components/QuestionList";

const fakeQuestion = new Question(
  1,
  "What is your name?",
  "juan@polito.it",
  "2024-02-07"
);
fakeQuestion.init();

function App() {
  const [question, setQuestion] = useState({
    id: fakeQuestion.id,
    text: fakeQuestion.text,
    email: fakeQuestion.email,
    date: fakeQuestion.date,
  });

  const [answers, setAnswers] = useState(fakeQuestion.getAnswers());

  const [likes, setLikes] = useState(0);

  const [comment, setComment] = useState("ok");

  const [language, setLanguage] = useState("IT");

  const toggleLanguage = () => {
    setLanguage(language === "IT" ? "EN" : "IT");
  };

  const increaseLikes = () => {
    setLikes((oldLikes) => oldLikes + 1);
  };

  // const voteUp = (answerId) => { setQuestion( (oldQuestion) => {return totally new Object,
  //    identical to the previous one (oldQuestion), except for the score of this specific answer}}

  const deleteAnswer = (id) => {
    setAnswers((oldAnswers) => oldAnswers.filter((a) => a.id != id));
  };

  /*
  const voteUp = (id) => {
    setAnswers(oldAnswers => oldAnswers.map( a => {
      if(a.id==id) {
        return {...a, score: a.score+1}
      } else {
        return a
      }
    }))
  }
  */

  const addAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      const newId = Math.max(...oldAnswers.map((ans) => ans.id)) + 1;
      const newAnswer = new Answer(
        newId,
        answer.text,
        answer.email,
        answer.date,
        0
      );

      return [...oldAnswers, newAnswer];
    });
  };

  const editAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      const answers = oldAnswers.filter((a) => a.id != answer.id);
      const newAnswer = new Answer(
        answer.id,
        answer.text,
        answer.email,
        answer.date,
        answer.score
      );
      return [...answers, newAnswer];
    });
  };

  const voteUp = (id) => {
    setAnswers((oldAnswers) =>
      oldAnswers.map((a) => (a.id == id ? { ...a, score: a.score + 1 } : a))
    );
  };

  return (
    <LanguageContext.Provider value={language}>
      <Container>
        <NavigationBar
          qtnnumber={1}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route
            path="/questions/:qid"
            element={
              <QuestionComponent
                likes={likes}
                increaseLikes={increaseLikes}
                question={question}
              ></QuestionComponent>
            }
          >
            <Route
              path="add"
              element={<AnswerForm addAnswer={addAnswer} mode="add" />}
            />
            <Route
              index
              element={
                <Answers
                  answers={answers}
                  deleteAnswer={deleteAnswer}
                  voteUp={voteUp}
                  addAnswer={addAnswer}
                  editAnswer={editAnswer}
                ></Answers>
              }
            />
          </Route>
        </Routes>
      </Container>
    </LanguageContext.Provider>
  );
}

export default App;
