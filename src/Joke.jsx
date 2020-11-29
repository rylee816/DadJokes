import React from "react";
import "./Joke.css"

function Joke(props){

  const colorArray = ["#f44336", "#ff9800", "#ff9800", "#ffc107", "#ffeb3b", "#cddc39", "#8bc34a", "#4caf50"];
  const emojiArray = ["em em-angry", "em em-confused", "em em-neutral_face", "em em-slightly_smiling_face", "em em-smiley", "em em-laughing", "em em-rolling_on_the_floor_laughing", "em em-heart_eyes"]
  let color;
  let emoji;

 if(props.votes < 0){
    color = "red"
    emoji = "em em-face_with_symbols_on_mouth"
  }else if(props.votes < colorArray.length && props.votes >= 0 ){
    color = colorArray[props.votes]
    emoji = emojiArray[props.votes]
} else {
    color = "limegreen";
    emoji = "em em-heart_eyes";
}

    return (
        <div className="Joke">
          <div className="Joke-buttons">
            <i className="fas fa-arrow-up" onClick={props.handleUpvote}></i>
              <span className="Joke-votes" style={{borderColor:color}} >{props.votes}</span>
            <i className="fas fa-arrow-down" onClick={props.handleDownvote}></i>
          </div>
          <div className="Joke-text">
            <h3>{props.joke}</h3>
          </div>
          <div className="Joke-smiley">
          <i className={emoji} aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
          </div>
        </div>
    )
}

export default Joke;