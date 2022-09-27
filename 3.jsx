import { useEffect, useState, useRef } from "react";

/**
 * Create a custom hook useInterval
 * which has the same signature as setInterval
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
 *
 * When the delay is changed, the hook must
 * adapt to the delay in runtime, and clicking
 * pause must only pause the timer and not reset
 * the count
 *
 */
function useInterval(callback, delay){
  useEffect(() => {
    let interval = null;
    if (delay !== undefined) {
      interval = setInterval(callback, delay);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [delay]);
}

export default function App() {
  const [value, setValue] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isPaused, setIsPaused] = useState(false);


  const incrementCounter = () => {
    setValue((value) => value + 1);
  };

  useInterval(incrementCounter, !isPaused ? delay : undefined)


  return (
    <>
      <h1>Count: {value}</h1>
      <span>Delay (in ms: )</span>
      <input value={delay} onChange={(e) => {
        let value = Number(e.target.value)
        value = isNaN(value) ? 0 : value
        setDelay(value)
        }} />
      <br />
      <br />
      <button onClick={() => setIsPaused((isPaused) => !isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
    </>
  );
}
