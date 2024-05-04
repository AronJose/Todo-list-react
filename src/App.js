import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [selectedTodos, setSelectedTodos] = useState([]);

  // Add data
  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { id: Date.now(), text: todo, status: false, editing: false },
    ]);
    setTodo(""); // Clear input after adding todo
  };

  // checkbox selecting
  const handleCheckboxChange = (id, status) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, status: !status } : item
    );
    setTodos(updatedTodos);
  };

  // delete
  const handleDeleteTodo = () => {
    const updatedTodos = todos.filter(
      (item) => !selectedTodos.includes(item.id)
    );
    setTodos(updatedTodos);
    setSelectedTodos([]); // Clear selected todos after deletion
  };

  // edit
  const editClick = (id) => {
    setEditId(id);
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setEditText(todoToEdit.text);
    }
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((item) =>
      item.id === editId ? { ...item, text: editText } : item
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditText("");
  };

  // toggle selection for a todo item
  const toggleTodoSelection = (id) => {
    setSelectedTodos((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <div className="app">
      <div className="main">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>

        <div className="input">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder=" 🖊️ Add item..."
          />
          <i onClick={handleAddTodo} className="fa fa-plus pluse"></i>
        </div>
      </div>
      <div>
        {selectedTodos.length > 0 && (
          <i class="fa fa-trash" onClick={handleDeleteTodo}></i>
        )}
      </div>
      {todos.map((value, index) => (
        <div className="todos" key={index}>
          <div className="todo">
            <div className="left">
              <input
                onChange={() => handleCheckboxChange(value.id, value.status)}
                type="checkbox"
                name=""
                id=""
                checked={selectedTodos.includes(value.id)}
                onClick={() => toggleTodoSelection(value.id)} // toggle selection
              />
              {value?.id === editId ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p>{value.text}</p>
              )}
            </div>

            <div className="right">
              <i
                className="fa fa-times"
                onClick={() => handleDeleteTodo(value.id)}
              ></i>
              {value.id === editId ? (
                <i className="fa fa-check" onClick={handleSaveEdit}></i>
              ) : (
                <i
                  className="fa fa-pencil"
                  onClick={() => editClick(value.id)}
                ></i>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
