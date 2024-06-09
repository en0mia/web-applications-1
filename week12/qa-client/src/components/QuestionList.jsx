import { Link } from "react-router-dom";

function QuestionList(props) {
  if (props.loading) return "Loading...";
  if (props.questions.length == 0) return "No questions yet...";
  else
    return (
      <div>
        <ul>
          {props.questions.map((q, i) => (
            <li key={i}>
              <Link to={`/questions/${q.id}`}>{q.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default QuestionList;
