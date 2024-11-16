/* eslint-disable react/prop-types */
import { useState } from "react";
import "./TodoItemStyle.css";

// eslint-disable-next-line react/prop-types
const TodoItem = ({ todoItem }) => {
  // eslint-disable-next-line react/prop-types
  const [isDone, setIsDone] = useState(todoItem.isComplete);

  const finishTask = () => {
    setIsDone(true);
  };

  return (
    <div>
      <li>
        {todoItem.name}
        <span className={isDone ? "cmp" : "pending"}>
          {" "}
          {isDone ? "Done" : "Pending"}{" "}
        </span>
      </li>
      {!isDone && (
        <button className="finish-btn" onClick={finishTask}>
          Mark it Finish
        </button>
      )}
    </div>
  );
};

export default TodoItem;
