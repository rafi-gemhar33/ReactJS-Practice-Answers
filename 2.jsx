import { useState } from "react";


const useLocalStorage = (key) => {
  let [v, setv] = useState(localStorage.getItem(key));

  const setToLs = (val) => {
    console.log(key, val);

    localStorage.setItem(key, val);
    setv(val);
  };
  return [v, setToLs];
};

export default function App() {
  const [v, setV] = useLocalStorage("BigBinary");

  const handleChange = (e) => {
    setV(e.target.value);
  };
  return (
    <>
      <input value={v} onChange={handleChange} />
      <p>{v}</p>
    </>
  );
}

