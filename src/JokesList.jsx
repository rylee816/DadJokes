import Axios from "axios";
import React, {useEffect, useState} from "react";
import Joke from "./Joke";
import "./JokesList.css"

function JokesList(props){

const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem("jokes")) || []); 
const [loading, setLoading] = useState(false)
let votes = window.localStorage.setItem("jokes", JSON.stringify(jokes));
const seenJokes = new Set(jokes.map(j => j.body))
console.log(seenJokes);

async function getJokes(){
  try {
    let jokesArray = []
    while(jokesArray.length < props.numJokesToGet){
        const headers = {headers:{Accept: "application/json"}};
        const response = await Axios.get(`https://icanhazdadjoke.com/`, headers);
        const {id, joke} = response.data;
        if(!seenJokes.has(joke)){
          jokesArray.push({id: id, body: joke, votes: 0});
        } else {
          console.log("Found duplicate ");
        }
    }
        setJokes((prev) => {
          return [...prev, ...jokesArray];
        })
        setLoading(false)
      } catch(e) {
        alert(e)
        setLoading(false)
      }
};

   useEffect(() => {
    if(jokes.length === 0){
      getJokes();
    }
   },[votes]);
  //  console.log(jokes);

   function handleVote(id, delta){
      setJokes((prev) => {
        return prev.map((j) => {
         return j.id === id ? {...j, votes: j.votes + delta} : j;
        })
      })
   }

   function handleClick(){
     setLoading(true)
     getJokes()
   }

   let sortedJokes = jokes.sort((a,b) => b.votes - a.votes)
    return (
        loading ? <div className="JokesList-spinner">
          <i className="far fa-10x fa-laugh fa-spin"></i>
          <h1 className="JokesList-title">Loading...</h1>
        </div> :

        <div className="JokesList">
          <div className="JokesList-sidebar">
            <h1 className="JokesList-title">
              <span>Dad</span>Jokes
            </h1>
            <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="" />
            <button className="JokesList-getmore" onClick={handleClick}>New Jokes</button>
          </div>
            <div className="JokesList-joke">
            {sortedJokes.map((j,index) => {
          return(
              <div>
              <Joke key={index} id={j.id} joke={j.body} votes={j.votes} handleUpvote={()=>handleVote(j.id, 1)} handleDownvote={()=>handleVote(j.id, -1)}/> 
              </div>
          )
        })}
            </div>
        </div>
    )
};

export default JokesList;