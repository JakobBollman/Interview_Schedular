import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Changes modes to inputed mode
  function transition(newMode, replace) {
    if(!replace){
      setHistory(current => [...current, mode]);
    }
    setMode(newMode);
  }

  //Returns to previous mode
  function back() {
    let newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back };
};