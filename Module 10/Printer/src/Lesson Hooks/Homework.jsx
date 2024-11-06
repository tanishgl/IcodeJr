import { useEffect } from "react";
import { useState } from "react";
import useKey from "./useKey";

const Homework = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count value has changed");
  }, [count]);

  useKey(count, setCount);

  return (
    <button onClick={() => setCount((count) => count - 2)}> {count} </button>
  );
};

export default Homework;