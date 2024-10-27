import { useEffect } from "react";

const useKey = (count, setCount) => {
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        setCount(count + 1);
      }
    });
  }, [count, setCount]);
};

export default useKey;
