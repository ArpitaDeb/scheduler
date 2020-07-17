import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newmode, replace = false) => {
    setMode(newmode);
    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newmode]));
    } else {
      setHistory(prev => ([...prev, newmode]));
    }
  }

  const back = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      setHistory(updatedHistory);
      setMode(updatedHistory[updatedHistory.length - 1]);
    }
  }
  return { mode, transition, back };
}
