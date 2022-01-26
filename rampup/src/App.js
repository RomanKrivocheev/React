import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

let filtering;

function App() {
  if (window.localStorage.getItem("user")) {
    data = JSON.parse(window.localStorage.getItem("user"));
  } else {
  }

  const [toDoList, setToDoList] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [...copy, { id: Math.random(), task: userInput, complete: false }];
    setToDoList(copy);
  };

  const eraseLocalStorage = () => {
    setToDoList([]);
    window.localStorage.setItem("user", JSON.stringify([]));
  };
  const saveLocalStorage = () => {
    window.localStorage.setItem("user", JSON.stringify(toDoList));
  };
  const handleChange = (e) => {
    const result = toDoList.filter(
      (element) => element.task == e.currentTarget.value
    );

    if (result.length > 0) {
      window.localStorage.setItem("user", JSON.stringify(toDoList));
      setToDoList(result);
      filtering = true;
    } else {
      if (filtering) {
        setToDoList(JSON.parse(window.localStorage.getItem("user")));
        filtering = false;
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <ToDoList
        toDoList={toDoList}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
      />
      <ToDoForm addTask={addTask} />

      <input
        class="form-control"
        type="text"
        onChange={handleChange}
        placeholder="Type to search..."
      />

      <button class="btn btn-danger" onClick={eraseLocalStorage}>
        Erase local info and start over
      </button>
      <button class="btn btn-success" onClick={saveLocalStorage}>
        Save info on local storage
      </button>
    </div>
  );
}

export default App;
