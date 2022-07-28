import React from "react";
import Question from "./Question";

export default function Quiz() {


    // state for our question


    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

    function handleClick() {
        audio.play();
    }
    return (
        <div className="quiz">
            <img className='top-blob' src="../images/top-blob.png"></img>
            <div className="questions-container">
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
            <button className="check-answers" onClick={handleClick}>Check Answers</button>
            </div>
            <img className='bottom-blob' src='../images/bottom-blob.png'></img>
        </div>
    )
}