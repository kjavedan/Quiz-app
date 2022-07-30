import React from "react";
import { nanoid } from 'nanoid'

import Question from "./Question";

export default function Quiz() {
    // the sound when the button is clicked
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

    console.log('Quiz rendered')
    // making an api call to receive the data
    React.useEffect(() => { // the use effect hook runs last
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => setData(data.results))
    }, []);

    // state for our question data
    const [data, setData] = React.useState([]);
    console.log(data)

    const [answersData, setAnswersData] = React.useState()

    const answersArray = data.map((item) => {
        const answers = (item.correct_answer + ',' + item.incorrect_answers).split(",");
        // Fisher Yates Shuffle algorithem for shffling our array
        let currentIndex = answers.length;
        while (--currentIndex > 0) {
            let temp = answers[currentIndex];
            let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            answers[currentIndex] = answers[randomIndex];
            answers[randomIndex] = temp;
        }
        return answers
    })

    const newArr = []
    answersArray.map(answers => {
        newArr.push(answers.map(answer =>{
            return({
                body : answer,
                id : nanoid(),
                isHeld : false,
                isCorrect : false
            })
        }))
    })
    console.log(newArr)

    //     // map over my question data and create question component
    //     const questions = data.map((item) => {
    //         return(
    //         <Question
    //         key = {nanoid()}
    //         id = {nanoid()}
    //         question = {item.question}
    //         correctAnswer = {item.correct_answer}
    //         incorrectAnswers = {item.incorrect_answers}
    //         answers = {item.incorrect_answers + ',' + item.correct_answer}
    //          />
    //         )
    //     })


    //    function handleClick(){
    //        console.log('hi')
    //    }


    //     return (
    //         <div className="quiz">
    //             <img className='top-blob' src="../images/top-blob.png"></img>
    //             <div className="questions-container">
    //                 {questions}
    //             <button className="check-answers" onClick={handleClick}>Check Answers</button>
    //             </div>
    //             <img className='bottom-blob' src='../images/bottom-blob.png'></img>
    //         </div>
    //     )
}
/*
* let's get the answers in a seprate state with some extra proprty id, isHeld, correctAnswer, answer
*/

