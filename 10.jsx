import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [v, setV] = useState("BIGBINARY");
  const fixCursorPositionCallbackRef = useRef(null);

  useEffect(() => {
    if (fixCursorPositionCallbackRef.current) {
      fixCursorPositionCallbackRef.current();
    }
  }, [v]);

  const handleChange = (e) => {
    const s = e.target.selectionStart;
    fixCursorPositionCallbackRef.current = () => {
      e.target.setSelectionRange(s, s);
    };

    setV(e.target.value.toUpperCase());
  };

  return (
    <>
      <input value={v} onChange={handleChange} />
    </>
  );
}
