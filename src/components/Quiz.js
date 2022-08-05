import React from "react";
import { nanoid } from 'nanoid'
import Exam from "./Exam";
import Categories from "./Categories";

export default function Quiz() {
    // first we will have a state that will determain where we should be 
    // exam.js or category.js  
    // by default we will be at categories in order to selct category
    // after selecting we will get the link in quiz page and send it as props to exam page
    // finally we will replace the hard coded link with the dynamic one


    const [selectCategory, setSelectCategory] = React.useState(true)

    return (
        <div className="quiz">
            {
                selectCategory ?
                    <Categories
                        setSelectCategory={setSelectCategory}
                    />
                    :
                    <Exam />
            }
        </div>
    )
}

