import { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoStyle.css";

let tasks = [
  {
    name: "Complete Homework",
    estimate: "2 hours",
  },
  {
    name: "Play with friend",
    estimate: "3 hours",
  },
];

const Todo = () => {
  const [requestNew, setRequestNew] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [est, setEst] = useState("");
  const addTask = () => {
    tasks = [
      ...tasks,
      {
        name: taskName,
        estimate: est,
      },
    ];
    setRequestNew(false);
    setTaskName("");
    setEst("");
  };
  return (
    <>
      <button onClick={() => setRequestNew(true)} className="todo-btn">
        {" "}
        Add New Task +{" "}
      </button>
      {requestNew && (
        <form className="ip-form">
          <input
            type="text"
            name="taskname"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="input-btn"
          />
          <input
            type="text"
            name="est"
            placeholder="estimated time"
            value={est}
            onChange={(e) => setEst(e.target.value)}
            className="input-btn"
          />
          <button onClick={addTask} className="submit-btn">
            Submit
          </button>
        </form>
      )}
      <ul>
        {tasks.map((task, idx) => {
          return <TodoItem todoItem={task} key={idx}></TodoItem>;
        })}
      </ul>
    </>
  );
};

export default Todo;
