import React from 'react'
import { nanoid } from 'nanoid'
import Question from "./Question"

export default function Exam() {
    // the sound when the button is clicked
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");


    // state for our received date from the api
    const [data, setData] = React.useState([]);

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

    //state to finish the game
    const [endQuiz, setEndQuiz] = React.useState(false)

    // state to call the api again
    const [callApi, setCallApi] = React.useState(false)


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

    function checkAnswers() {
        audio.play();
        setState(prevState => {
            return prevState.map(item => {
                const correctAnswer = item.correctAnswer;
                return ({
                    ...item, answers: item.answers.map(answer => {
                        if (answer.isHeld && answer.body === correctAnswer) {
                            return { ...answer, isCorrect: true }
                        }
                        else if (!answer.isHeld && answer.body === correctAnswer) {
                            return { ...answer, showCorrect: true }
                        }
                        else if (answer.isHeld && answer.body != correctAnswer) {
                            return { ...answer, isIncorrect: true }
                        }
                        else return { ...answer, isBlur: true }
                    })
                })
            })
        })
        setEndQuiz(true);
    }

    // function for counting the number of correct answers on each render
    let count = 0;
    function countCorrectAnswers() {
        state.map(item => {
            item.answers.map(answer => {
                if (answer.isCorrect) {
                    count++;
                }
            })
        })
    }
    countCorrectAnswers();

    // function to play again
    function playAgain() {
        audio.play();
        setCallApi(prevState => !prevState)
        setEndQuiz(false)
    }
    // making an api call to receive the data
    React.useEffect(() => { // the use effect hook runs last
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setData(data.results)
            })
    }, [callApi]);

    // tracking api calls in order to set our custom state
    React.useEffect(() => {
        setState(initiolizeState())
    }, [data])

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
                        showCorrect: false,
                        isBlur: false
                    })
                })
            })
        })
        return newArr
    }

  return (
   <div className="exam">
            <img className='top-blob' src="../images/top-blob.png"></img>
            <div className="questions-container">
                {questionElements}
                <div className="result">
                    {endQuiz && <p className="count-correct-answers">{`You scored ${count}/5 correct answers`}</p>}
                    {!endQuiz && <button className="check-answers" onClick={checkAnswers}>Check Answers</button>}
                    {endQuiz && <button className="check-answers" onClick={playAgain}>Play again</button>}
                </div>
            </div>
            <img className='bottom-blob' src='../images/bottom-blob.png'></img>
        </div>
  )
}
