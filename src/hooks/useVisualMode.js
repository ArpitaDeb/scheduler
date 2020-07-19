import { useState } from "react";

//Custom hooks to track transition modes history of the appointment component
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //if replace is true, replace last mode with the input newmode 
  // if replace is false, push the new mode
  const transition = (newmode, replace = false) => {
    setMode(newmode);
    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newmode]));
    } else {
      setHistory(prev => ([...prev, newmode]));
    }
  }
  
//delete the last mode and set updated last mode 
  const back = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      setHistory(updatedHistory);
      setMode(updatedHistory[updatedHistory.length - 1]);
    }
  }
  //return these functions to update mode transition in other components
  return { mode, transition, back };
}
