"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  const table = document.getElementById("answers-table");

  // Create or load the list of answers
  const question = getQuestion();
  loadAnswers(question);

  console.log(question);

  // Generate the table content starting from the list of answers
  for (const answer of question.answers) {
    // One by one:
    const tr = document.createElement("tr");

    [
      answer.date.format("YYYY-DD-MM"),
      answer.text,
      answer.email,
      answer.score,
    ].forEach((innerText) => {
      const td = document.createElement("td");
      td.innerText = innerText;
      tr.appendChild(td);
    });

    const tdActions = document.createElement("td");

    const btnVote = document.createElement("button");
    btnVote.id = "answer-" + answer.id;
    btnVote.answerId = answer.id;
    btnVote.classList.add("btn", "btn-warning");
    btnVote.addEventListener("click", (event) => {
      console.log("up!", event.currentTarget.answerId);

      // With closure
      const theAnswer = answer;
      console.log("Store using closure: " + theAnswer.id);

      // Navigating the DOM
      const oldScore = event.currentTarget.parentNode.previousSibling.innerText;
      event.currentTarget.parentNode.previousSibling.innerText =
        parseInt(oldScore) + 1;
    });
    tdActions.appendChild(btnVote);

    const iconVote = document.createElement("i");
    iconVote.classList.add("bi", "bi-arrow-up");
    btnVote.appendChild(iconVote);

    tr.appendChild(tdActions);

    // Using innerHTML
    /* const tr = document.createElement("tr");
    tr.innerHTML = `<td>${answer.date.format("YYYY-MM-DD")}</td>
    <td>${answer.text}</td>
    <td>${answer.email}</td>
    <td>${answer.score}</td>`;

    const tdActions = document.createElement("td");
    tdActions.innerHTML = `<button type="button" class="btn btn-primary">
    <i class="bi bi-hand-thumbs-up"></i>
  </button>
  <button type="button" class="btn btn-warning">
    <i class="bi bi-pencil-square"></i>
  </button>
  <button type="button" class="btn btn-danger">
    <i class="bi bi-trash3"></i>`;

    tr.appendChild(tdActions); */
    table.appendChild(tr);
  }
});

function getQuestion() {
  return new Question(
    1,
    "Is Javascript better than Python?",
    "luigi.derussis@polito.it",
    "2024-04-16"
  );
}

function loadAnswers(question) {
  question.addAnswer(
    new Answer(1, "Yes", "luca.mannella@polito.it", "2024-02-15", -10)
  );
  question.addAnswer(
    new Answer(
      2,
      "Not in a million year",
      "guido.vanrossum@python.org",
      "2024-03-31",
      1
    )
  );
}

function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.score = score;
  this.date = dayjs(date);
}

function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);
  this.answers = [];

  this.addAnswer = (answer) => {
    this.answers.push(answer);
  };

  this.getAnswers = () => {
    return [...this.answers];
  };
}
