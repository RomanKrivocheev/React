import React, {useState} from 'react';
import './App.css';
import data from './data.json';

import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';

function App() {
  
  if(window.localStorage.getItem('user')) {
    data = JSON.parse(window.localStorage.getItem('user'));
  } else {
  }
  
  const [ toDoList, setToDoList ] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: Math.random(), task: userInput, complete: false }];
    setToDoList(copy);
  }

  const eraseLocalStorage = ()  => {
    window.localStorage.clear();
    document.location.reload()
  }
  const saveLocalStorage = () => {
    console.log(toDoList);
    window.localStorage.setItem('user', JSON.stringify(toDoList));

  }
  

  return (
    <div className="App">
      <Header />
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ToDoForm addTask={addTask}/>
      
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
