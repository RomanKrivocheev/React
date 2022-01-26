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
    let mapped = JSON.parse(window.localStorage.getItem("user")).map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
    saveLocalStorage(mapped);

    handleChange(document.getElementById("searchInput").value);
  };

  const handleFilter = () => {
    let filtered = JSON.parse(window.localStorage.getItem("user")).filter(
      (task) => {
        return !task.complete;
      }
    );
    setToDoList(filtered);
    saveLocalStorage(filtered);
    handleChange(document.getElementById("searchInput").value);
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
    if (typeof e === "string" || e instanceof String) {
      const result = JSON.parse(window.localStorage.getItem("user")).filter(
        (element) => element.task.startsWith(e)
      );
      if (e.length == 0) {
        setToDoList(JSON.parse(window.localStorage.getItem("user")));
      } else {
        setToDoList(result);
      }
    } else {
      const result = JSON.parse(window.localStorage.getItem("user")).filter(
        (element) => element.task.startsWith(e.currentTarget.value)
      );
      if (e.currentTarget.value.length == 0) {
        setToDoList(JSON.parse(window.localStorage.getItem("user")));
      } else {
        setToDoList(result);
      }
    }
  };

  return (
    <div className="App">
      <div class="container-fluid">
        <Header />
        <div class="row">
          <div class="col-md-12">
            <ToDoList
              toDoList={toDoList}
              handleToggle={handleToggle}
              handleFilter={handleFilter}
            />
            <div class="row justify-content-md-center">
              <div class="col col-lg-2">
                <ToDoForm addTask={addTask} />
              </div>
              <div class="col col-lg-2">
                <input
                  id="searchInput"
                  class="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Type to search..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-danger" onClick={eraseLocalStorage}>
        Erase local info and start over
      </button>
    </div>
  );
}

export default App;
