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

    // state for our received date from the api
    const [data, setData] = React.useState([]);
    // console.log(data)

    // tracking api calls in order to set our custom state
    React.useEffect(()=>{
        setState(initiolizeState())
    },[data])


    const questions = data.map((item) => {
        const answers = (item.correct_answer + ',' + item.incorrect_answers).split(",");
        const question = item.question;
        const correctAnswer = item.correct_answer;
        // Fisher Yates Shuffle algorithem for shffling our array
        let currentIndex = answers.length;
        while (--currentIndex > 0) {
            let temp = answers[currentIndex];
            let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            answers[currentIndex] = answers[randomIndex];
            answers[randomIndex] = temp;
        }
        return {question, correctAnswer, answers}
    })
 
    // our custom state after suffling the answers and give unique property for each answer
    const [state, setState] = React.useState([]);
    
    // function to initilize our custom state
    function initiolizeState() {
        const newArr = [];
        questions.map(question =>{
            newArr.push({
                question : question.question,
                correctAnswer : question.correctAnswer,
                answers : question.answers.map(answer =>{
                    return({
                        body : answer,
                        id : nanoid(),
                        isHeld : false,
                        isCorrect : false
                    })
                }) 
            })
        })
        return newArr
    }
    
    
        // map over state and create question component
        const questionElements = state.map((item) => {
            return(
            <Question
            key = {nanoid()}
            question = {item.question}
            correctAnswer = {item.correctAnswer}
            answers = {item.answers}
             />
            )
        })
        

        return (
            <div className="quiz">
                <img className='top-blob' src="../images/top-blob.png"></img>
                <div className="questions-container">
                <button className="check-answers">Check Answers</button>
                </div>
                <img className='bottom-blob' src='../images/bottom-blob.png'></img>
            </div>
        )
}
/*
* let's get the answers in a seprate state with some extra proprty id, isHeld, correctAnswer, answer
*/

