import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

function App() {
  if (window.localStorage.getItem("user")) {
    data = JSON.parse(window.localStorage.getItem("user"));
  }

  const [toDoList, setToDoList] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
    saveLocalStorage(mapped);
    // TODO ---->
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
    saveLocalStorage(filtered);
    // TODO ---->
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [...copy, { id: Math.random(), task: userInput, complete: false }];
    setToDoList(copy);
    saveLocalStorage(copy);
  };

  const eraseLocalStorage = () => {
    setToDoList([]);
    saveLocalStorage([]);
  };
  const saveLocalStorage = (saveContent) => {
    window.localStorage.setItem("user", JSON.stringify(saveContent));
  };
  const handleChange = (e) => {
    const result = JSON.parse(window.localStorage.getItem("user")).filter(
      (element) => element.task.startsWith(e.currentTarget.value)
    );
    if (e.currentTarget.value.length == 0) {
      setToDoList(JSON.parse(window.localStorage.getItem("user")));
    } else {
      setToDoList(result);
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
    </div>
  );
}

export default App;
