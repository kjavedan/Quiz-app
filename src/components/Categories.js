import React from "react";
import ReactDOM from 'react-dom';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faAtom, faBrain, faMicrochip, faCalculator, faLandmark, faDumbbell } from '@fortawesome/free-solid-svg-icons';

  const style ={
    color : "white"
  }

 

export default function Categories(props) {
  return (
    <div className="categories-container">
      <img className="top-blob" src="../images/top-blob.png"></img>
      <div className="content">
        <h2 className="content__title">Quizzical</h2>
        <p className="content__text">Select Category</p>
      </div>
      <div className="categories">
      
      {/* button 1 */}
        <button
         value={"general-info"} 
         onClick={props.handleClick} 
         className="btn">
         General information 
         <FontAwesomeIcon icon={faBrain}/>
        </button>

      {/* button 2 */}
        <button 
        value={"IT"} 
        onClick={props.handleClick} 
        className="btn">
        Technology 
        <FontAwesomeIcon icon={faMicrochip} />
        </button>

      {/* button 3 */}
        <button 
        value={"math"} 
        onClick={props.handleClick} 
        className="btn">
        Mathematics 
        <FontAwesomeIcon icon={faCalculator} />
        </button>

      {/* button 4 */}
        <button 
        value={"science"} 
        onClick={props.handleClick} 
        className="btn">
        Science 
        <FontAwesomeIcon icon={faAtom} />
        </button>
        
      {/* button 5 */}
        <button 
        value={"history"} 
        onClick={props.handleClick}
        className="btn">
        History 
        <FontAwesomeIcon 
        icon={faLandmark} />
        </button>

      {/* button 6 */}
        <button 
        value={"sports"} 
        onClick={props.handleClick} 
        className="btn">
        Sports 
        <FontAwesomeIcon icon={faDumbbell} />
        </button>

      </div>
      <img className="bottom-blob" src="../images/bottom-blob.png"></img>
    </div>
  );
}
