import React from "react"
import JokesList from "./JokesList";
import './App.css';


function App() {
  return (
    <div className="App">
      <JokesList numJokesToGet={10}/>
    </div>
  );
}

export default App;
