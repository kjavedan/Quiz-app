import React from "react";


export default function Question(props){
    // creatin an array for all answers
    const allAnswers = props.answers.split(',');

    console.log('unshuffled :' + allAnswers)

    // Fisher Yates Shuffle algorithem for shffling our array
   let currentIndex = allAnswers.length;
   while(--currentIndex > 0){
    let temp = allAnswers[currentIndex];
    let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    allAnswers[currentIndex] = allAnswers[randomIndex];
    allAnswers[randomIndex] = temp;
   }
      console.log('shuffled :' + allAnswers)
      console.log('-----------------------')

    return(
        <div className="question">
            <div className="question_title">{props.question}</div>
            <div className="answers-container">
                <div className="answer">{allAnswers[0]}</div>
                <div className="answer">{allAnswers[1]}</div>
                <div className="answer">{allAnswers[2]}</div>
                <div className="answer">{allAnswers[3]}</div>
            </div>
        </div>
    )
}