import React, { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        class="form-control"
        value={userInput}
        type="text"
        onChange={handleChange}
        placeholder="Enter a task to add..."
      />
      <button style={{ margin: "10px" }} class="btn btn-primary">Submit</button>
    </form>
  );
};

export default ToDoForm;
