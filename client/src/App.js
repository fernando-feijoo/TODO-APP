import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(false);

  const [todoList, setTodoList] = useState([]);

  const getTodoList = () => {
    Axios.get("http://localhost:4000/todos").then((response) => {
      setTodoList(response.data);
    });
  };

  const add = () => {
    const completedValue = status === "on";
    Axios.post("http://localhost:4000/todos", {
      title: title,
      description: description,
      category: category,
      completed: completedValue,
    })
      .then(() => {
        getTodoList();
        // Reset the values of the form fields
        setTitle("");
        setDescription("");
        setCategory("");
        setStatus(false);
      })
      .catch((error) => {
        console.error("Error in the request:", error);
      });
  };

  getTodoList();

  return (
    <div className="container">
      <div className="App">
        <div className="list">
          {todoList.map((val, key) => {
            return <div className=""> {val.title} </div>;
          })}
        </div>
      </div>
      <div className="card text-center">
        <div className="card-header">Form TODO list!</div>
        <div className="card-body"></div>
        <label>
          Title:{" "}
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
          />
        </label>
        <label>
          Description:{" "}
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
          />
        </label>
        <label>
          Category:{" "}
          <input
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            type="text"
          />
        </label>
        <label>
          Completed/Incomplete:{" "}
          <input
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            type="checkbox"
          />
        </label>
      </div>
      <div className="card-footer text-muted">
        <button className="btn btn-success" onClick={add}>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
