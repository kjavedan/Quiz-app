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
    React.useEffect(() => {
        setState(initiolizeState())
    }, [data])

    // suffling our answers
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
        return { question, correctAnswer, answers }
    })

    // our custom state after suffling the answers and giving unique properties for each answer 
    const [state, setState] = React.useState([]);

    // function to initilize our custom state
    function initiolizeState() {
        const newArr = [];
        questions.map(question => {
            newArr.push({
                question: question.question,
                correctAnswer: question.correctAnswer,
                answers: question.answers.map(answer => {
                    return ({
                        body: answer,
                        id: nanoid(),
                        isHeld: false,
                        isCorrect: false,
                        isIncorrect: false,
                        showCorrect: false
                    })
                })
            })
        })
        return newArr
    }

    // map over state and create question component
    const questionElements = state.map((item) => {
        return (
            <Question
                key={nanoid()}
                question={item.question}
                correctAnswer={item.correctAnswer}
                answers={item.answers}
                setState={setState}
                handleClick={handleClick}
            />
        )
    })
    // handling the click event of each answer button
    function handleClick(question, id) {

        setState(prevState => {
            return prevState.map(item => {
                if (item.question === question) {
                    return ({
                        ...item, answers: item.answers.map(answer => {
                            return answer.id === id ?
                                { ...answer, isHeld: !answer.isHeld } :
                                { ...answer, isHeld: false }
                        })
                    })
                }
                else return item;
            })
        })
    }

    // function to check the given answers
    // challenge : map over each question and change the correct answer style to green
    // if the selected button is incorrect change the style to red
    // if the selectd buttom answer is correct add +1 to our count
    // change the check answer style and add a text to show the user how many answer he answered correctly
    function checkAnswers() {
        let count = 0;
        setState(prevState => {
            return prevState.map(item => {
                const correctAnswer = item.correctAnswer;
                return ({
                    ...item, answers: item.answers.map(answer => {
                        if (answer.isHeld && answer.body === correctAnswer) {
                            count++;
                            return {...answer, isCorrect: true }
                        }
                        else if (answer.isHeld && answer.body != correctAnswer) {
                            return { ...answer, isIncorrect: true }
                        }
                        else if (!answer.isHeld && answer.body === correctAnswer) {
                            return { ...answer, showCorrect: true }
                        }
                        else return answer
                    })
                })
            })
        })
        console.log(state)
    }

    console.log(state)

    return (
        <div className="quiz">
            <img className='top-blob' src="../images/top-blob.png"></img>
            <div className="questions-container">
                {questionElements}
                <button className="check-answers" onClick={checkAnswers}>Check Answers</button>
            </div>
            <img className='bottom-blob' src='../images/bottom-blob.png'></img>
        </div>
    )
}

