import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if(!replace){
      setHistory(current => [...current, mode]);
    }
    setMode(newMode);
  }

  function back() {
    if(mode !== initial){
      setMode(history[history.length - 1]);
      setHistory(history.slice(0, history.length - 1));
    } else {
      setMode(initial);
    }
  }

  return { mode, transition, back };
};