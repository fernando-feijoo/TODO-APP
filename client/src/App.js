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
    Axios.get(process.env.REACT_APP_LOCALHOST+"/todos").then((response) => {
      setTodoList(response.data);
    });
  };

  const add = () => {
    Axios.post(process.env.REACT_APP_LOCALHOST, {
      title: title,
      description: description,
      category: category,
      completed: status,
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
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Title:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className="form-control"
              placeholder="Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Description:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              className="form-control"
              placeholder="Description"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Category:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              className="form-control"
              placeholder="Category"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(event) => {
                setStatus(event.target.checked);
              }}
              value=""
            />
            <label className="form-check-label">Completed/Incomplete</label>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted mt-3">
        <button className="btn btn-success" onClick={add}>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
