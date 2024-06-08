"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Page loaded");

  document.getElementById("loadbtn").addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3001/api/questions");
      if (response.ok) {
        const questions = await response.json();

        const div = document.getElementById("questionlist");
        div.innerHtml = `<p>We have ${questions.length} questions</p>`;

        for (const q of questions) {
          div.innerHTML += `<p>${q.text}</p>`;
        }
      } else {
        console.log("HTTP error code ", response.status);
      }
    } catch (e) {
      console.log("Network error");
    }
  });
});
