import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import GreetingList from "./components/Greetings";

function App() {
  return (
    <>
      <h1>Greeting web application</h1>
      <GreetingList cnt={5} text="user"></GreetingList>
    </>
  );
}

export default App;
