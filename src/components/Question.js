import React from "react";


export default function Question(props){
    console.log(props)
    const allAnswers = props.incorrect_answers;
    
    return(
        <div className="question">
            <div className="question_title">{props.question}</div>
            <div className="answers-container">
                <div className="answer">Adiós</div>
                <div className="answer">Hola</div>
                <div className="answer">Au Revoir</div>
                <div className="answer">Salir</div>
            </div>
        </div>
    )
}