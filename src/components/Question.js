import { nanoid } from "nanoid";
import React from "react";

export default function Question(props) {

    const answers = props.answers.map(answer => {
        return (<div
            className={`answer ${answer.isHeld ? "held" : ""} ${answer.isCorrect ? "correct" : ""} ${answer.isIncorrect ? "incorrect" : ""}`}
            key={answer.id}
            onClick={() => props.handleClick(props.question,answer.id)}
        >{answer.body}</div>)
    })

    return (
        <div className="question">
            <div className="question_title">{props.question}</div>
            <div className="answers-container">
                {answers}
            </div>
        </div>
    )
}  