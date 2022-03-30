import React from "react";
import ToDo from "./ToDo";

const ToDoList = ({ toDoList, handleToggle, handleFilter }) => {
  return (
    <div>
      {toDoList.map((todo) => {
        return (
          <ToDo key={Math.random()}
            todo={todo}
            handleToggle={handleToggle}
            handleFilter={handleFilter}
          />
        );
      })}
      <button className="btn btn-secondary" style={{ margin: "20px" }} onClick={handleFilter}>
        Clear Completed
      </button>
    </div>
  );
};

export default ToDoList;
