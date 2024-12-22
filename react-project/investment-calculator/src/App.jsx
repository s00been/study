import { useState } from "react";

import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  })

  // duration만 우선 양수값만 가능하게 하자.
  const inputIsValid = userInput.duration >= 1;
  
  function handleChange(inputIdentifer, newValue) {
    setUserInput(prevUserInput => {
        return {
            ...prevUserInput,
            // + 문자열값을 숫자형값으로 강제 변경
            [inputIdentifer]: +newValue
        };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      { inputIsValid 
        ? <Results input={userInput} /> 
        : <p className="center">Please enter a duration greater than zero!</p>
    }
    </>
  )
}

export default App
