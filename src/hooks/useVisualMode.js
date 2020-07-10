import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newmode, replace = false) => {
    setMode(newmode);
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      newHistory.push(newmode);
      setHistory(newHistory);
    } else {
      setHistory([...history, newmode]);
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
