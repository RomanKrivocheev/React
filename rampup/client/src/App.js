import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";
import axios from "axios";

import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

function App() {

  useEffect(() => {
    const consultaAPI = async () => {
      const consulta = await axios("http://localhost:8000/api/tasks");
      setToDoList(consulta.data);
    };
    consultaAPI()
      .then((response) => {})
      .catch((response) => {
        console.log(JSON.stringify(response.message));
        setToDoList([
          toDoList,
          {
            task:
              "Error while loading the list: " +
              JSON.stringify(response.message) +
              ".",
            id: 1,
            complete: false,
          },
        ]);
      });
  }, []);
  // List
  const [toDoList, setToDoList] = useState(data);
  // Action to do when changes
  const [action, setAction] = useState("nothing");
  const [lastTaskModified, setLastTaskModified] = useState(data);

  // BD changes
  useEffect(() => {
    console.log("ACTION: " + action);
    if (action == "addTask") {
      const consultaAPI = async () => {
        await axios.post("http://localhost:8000/api/tasks", {
          id: lastTaskModified.id,
          task: lastTaskModified.task,
          complete: lastTaskModified.complete,
        });
      };
      consultaAPI()
        .then((response) => {})
        .catch((response) => {});
    } else if (action == "deleteAllTasks") {
      const consultaAPI = async () => {
        await axios.delete("http://localhost:8000/api/tasks");
      };
      consultaAPI()
        .then((response) => {})
        .catch((response) => {});
    } else if (action == "changeCompleted") {
      const consultaAPI = async () => {
        return await axios.put(
          `http://localhost:8000/api/tasks/${lastTaskModified.id}`,
          {
            id: lastTaskModified.id,
            task: lastTaskModified.task,
            complete: lastTaskModified.complete,
          }
        );
        // update list from db after updating
      };
      consultaAPI()
        .then((response) => {
          console.log(response);
          setAction("nothing");
          setToDoList(response.data);
        })
        .catch((err) => {});
    } else if (action == "deleteTasks") {
      const consultaAPI = async () => {
        await axios.delete("http://localhost:8000/api/tasks/deleteManys", {
          data: toDoList,
        });
      };
      consultaAPI()
        .then((response) => {})
        .catch((err) => {});
    }
  }, [toDoList]);

  // Action methods
  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      if (task.id == id) {
        lastTaskModified.id = Number(task.id);
        lastTaskModified.task = task.task;
        lastTaskModified.complete = !task.complete;
      }

      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });

    setToDoList(mapped);
    setAction("changeCompleted");

    let savedToDoList = JSON.parse(window.localStorage.getItem("user"));
    mapped = savedToDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });

    window.localStorage.setItem("user", JSON.stringify(mapped));
    // handleChange(document.getElementById("searchInput").value);
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
    setLastTaskModified(filtered);
    setAction("deleteTasks");
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    const newTask = { id: Math.random(), task: userInput, complete: false };
    copy = [...copy, newTask];
    setToDoList(copy);
    setLastTaskModified(newTask);
    setAction("addTask");
    window.localStorage.setItem("user", JSON.stringify(copy));
  };

  const eraseLocalStorage = () => {
    setToDoList([]);
    setAction("deleteAllTasks");
  };
  const handleChange = (e) => {
    setAction("Nothing");
    if (e.currentTarget.value.length === 0) {
      const consultaAPI = async () => {
        const consulta = await axios("http://localhost:8000/api/tasks");
        setToDoList(consulta.data);
        window.localStorage.setItem("user", JSON.stringify(consulta.data));
      };
      consultaAPI()
        .then((response) => {})
        .catch((response) => {
          setToDoList([
            toDoList,
            {
              task:
                "Error while loading the list: " +
                JSON.stringify(response.message) +
                ".",
              id: 1,
              complete: false,
            },
          ]);
        });
    } else {
      const result = JSON.parse(window.localStorage.getItem("user")).filter(
        (element) => element.task.startsWith(e.currentTarget.value)
      );
      setToDoList(result);
    }

    /*
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
    }*/
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-md-12">
            <ToDoList
              toDoList={toDoList}
              handleToggle={handleToggle}
              handleFilter={handleFilter}
            />
            <div className="row justify-content-md-center">
              <div className="col col-lg-2">
                <ToDoForm addTask={addTask} />
              </div>
              <div className="col col-lg-2">
                <input
                  id="searchInput"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Type to search..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-danger" onClick={eraseLocalStorage}>
        Erase local info and start over
      </button>
    </div>
  );
}

export default App;
