import { useEffect } from "react";
import { useState } from "react";
import useKey from "./useKey";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count value has changed");
  }, [count]);

  useKey(count, setCount);

  return (
    <button onClick={() => setCount((count) => count + 1)}> {count} </button>
  );
};

export default Counter;
