import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newmode, replace = false) => {
    //console.log('checking mode setting', newmode);
    setMode(newmode);
    if (replace) {
      /*
      const newHistory = [...history];
      newHistory.pop();
      newHistory.push(newmode);
      setHistory(newHistory);
      */
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newmode]));
      //console.log("updated", history);
    } else {
      //setHistory([...history, newmode]);
      setHistory(prev => ([...prev, newmode]));
      //console.log(history);
    }
  }
  const back = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      setHistory(updatedHistory);
      /*
      const elem = updatedHistory.pop();
      setHistory([...updatedHistory]);
      */
      //console.log(updatedHistory);
      setMode(updatedHistory[updatedHistory.length - 1]);
      //setMode(elem);
    }
  }
  return { mode, transition, back };
}
