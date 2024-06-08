import { useEffect, useState } from "react";
import API from "../api/API";

function QuestionList(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function execute() {
      API.loadQuestions().then((my_questions) => setQuestions(my_questions));
    }
    execute();
  }, []);

  return (
    <div>
      {questions.map((q, i) => (
        <p key={i}>{q.text}</p>
      ))}
    </div>
  );
}

export default QuestionList;
