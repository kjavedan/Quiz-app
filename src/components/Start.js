import React from "react";

export default function Start(props) {

    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");


    function handleClick() {
        audio.play();
        props.setStart(false);
    }



    return (
        <div className="start">
            <img className='top-blob' src="../images/top-blob.png"></img>
            <div className='content'>
                <h2 className='content__title'>Quizzical</h2>
                <p className='content__text'>test you'r general informaiton</p>
                <button onClick={handleClick} className='content__button'>Start Quiz</button>
            </div>
            <img className='bottom-blob' src='../images/bottom-blob.png'></img>
        </div>
    )
}