import React from 'react';
import Start  from './components/Start';
import Quiz from './components/Quiz';

function App() {

 // state to check if we started playing or not
  const [start, setStart] = React.useState(false)
  console.log('app rendered')
  return (
    <main>
    {
      !start 
    ? 
    <Quiz />
     :
    <Start
    setStart = {setStart}
     />
    }
    </main>
  );
}

export default App;
