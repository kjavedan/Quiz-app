import { nanoid } from "nanoid";
import React from "react";

export default function Question(props){


    // creatin an array for all answers
    const answers = props.answers.split(',');
    // Fisher Yates Shuffle algorithem for shffling our array
   let currentIndex = answers.length;
   while(--currentIndex > 0){
    let temp = answers[currentIndex];
    let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    answers[currentIndex] = answers[randomIndex];
    answers[randomIndex] = temp;
   }

   // set our state so we can have uninque property for each answer
   function initiolizeState(){
   const newAnswers = [] ;
   for(let i = 0; i < answers.length; i++){
    newAnswers.push({
        isHeld : false,
        body : answers[i],
        id : nanoid()
    })
   }
   return newAnswers
}  

    const [state, setState] = React.useState(initiolizeState())
    
//    const styles = {
//     backgroundColor : isHeld ? "#D6DBF5" : "",
//     border : isHeld ? 'none' : ""
//    }

   // map over state and create seperate answer
   const answerElements = state.map(answer => {
    return <div 
    key = {answer.id}
    className = {`answer ${answer.isHeld ? "held" : ""}`}
    onClick = {()=> handleClick(answer.id,answer.isHeld)}
    >{answer.body}</div>
   })  

   function handleClick(answerId, isHeld){
    console.log(answerId)
    console.log(isHeld)
    // I want to toggle isHeld proprty of the answer when it's clicked 
    // loop over the state
    // if id matches
    // spread all propty and overwrite isHeld
    setState(prevState => prevState.map(item => item.id === answerId ? {...item, isHeld : !isHeld} : {...item, isHeld : false} ));
   }

    return(
        <div className="question">
            <div className="question_title">{props.question}</div>
            <div className="answers-container">
            {answerElements}
            </div>
        </div>
    )
}  