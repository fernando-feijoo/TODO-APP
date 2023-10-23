import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todoId, setTodoId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);

  const [editList, setEditList] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const getTodoList = () => {
    Axios.get(process.env.REACT_APP_LOCALHOST + "/todos").then((response) => {
      setTodoList(response.data);
    });
  };

  const add = () => {
    Axios.post(process.env.REACT_APP_LOCALHOST + "/todos", {
      title: title,
      description: description,
      category: category,
      completed: completed,
    })
      .then(() => {
        getTodoList();
        // Reset the values of the form fields
        resetForm();
      })
      .catch((error) => {
        console.error("Error in the request:", error);
      });
  };

  const update = () => {
    Axios.put(`${process.env.REACT_APP_LOCALHOST}/todos/${todoId}`, {
      title: title,
      description: description,
      category: category,
      completed: completed, // Invert the value
    })
      .then(() => {
        getTodoList(); // Refresca la lista después de la actualización
        resetForm();
      })
      .catch((error) => {
        console.error("Error in the request:", error);
        console.log("todo_id:", todoId);
      });
  };

    
  const edit = (val) => {
    setEditList(true);

    setTodoId(val.todo_id);
    setTitle(val.title);
    setDescription(val.description);
    setCategory(val.category);
    setCompleted(val.completed);

  };

  const resetForm = () => {
    setTodoId(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setCompleted(false);
    setEditList(false);
  };

  getTodoList();

  return (
    <div className="container mt-4">
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
              value={title}
              placeholder="Enter Title"
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
              value={description}
              placeholder="Enter Description"
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
              value={category}
              placeholder="Enter Category"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted mt-3">
          {editList ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Edit
              </button>

              <button className="btn btn-info m-2" onClick={resetForm}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Save
            </button>
          )}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Completed/Incomplete</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((val, key) => {
            return (
              <tr key={val.todo_id}>
                <th>{val.todo_id}</th>
                <td>{val.title}</td>
                <td>{val.description}</td>
                <td>{val.category}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={val.completed}
                    onChange={() => {
                      Axios.put(
                        `${process.env.REACT_APP_LOCALHOST}/todos/${val.todo_id}`,
                        {
                          title: val.title,
                          description: val.description,
                          category: val.category,
                          completed: !val.completed, // Invert the value
                        }
                      ).then(() => {
                        getTodoList(); // Refresca la lista después de la actualización
                        resetForm();
                      });
                    }}
                  />
                </td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        edit(val);
                      }}
                      className="btn btn-info"
                    >
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
