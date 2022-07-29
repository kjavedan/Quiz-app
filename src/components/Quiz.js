import React from "react";
import { nanoid } from 'nanoid'

import Question from "./Question";

export default function Quiz() {

    // making an api call to receive the data
    React.useEffect(()=>{ // the use effect hook runs last
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => setData(data.results))
        },[])
        
    // state for our question data
    const [data, setData] = React.useState([])

    // map over my question data and create question component
    const questions = data.map((item) => {
        return(
        <Question
        key = {nanoid()}
        id = {nanoid()}
        question = {item.question}
        correctAnswer = {item.correct_answer}
        incorrectAnswers = {item.incorrect_answers}
        answers = {item.incorrect_answers + ',' + item.correct_answer}
         />
        )
    })


    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

    function handleClick(){
        audio.play();
    }
    return (
        <div className="quiz">
            <img className='top-blob' src="../images/top-blob.png"></img>
            <div className="questions-container">
                {questions}
            <button className="check-answers" onClick={handleClick}>Check Answers</button>
            </div>
            <img className='bottom-blob' src='../images/bottom-blob.png'></img>
        </div>
    )
}