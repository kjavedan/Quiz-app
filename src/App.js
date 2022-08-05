import React from 'react';
import Start  from './components/Start';
import Quiz from './components/Quiz';

function App() {

  const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

 // state to check if we started playing or not
  const [start, setStart] = React.useState(true)
  console.log('app rendered')
  return (
    <main>
    {
      !start 
    ? 
    <Quiz
    audio ={audio}
     />
     :
    <Start
    setStart = {setStart}
    audio ={audio}
     />
    }
    </main>
  );
}

export default App;
