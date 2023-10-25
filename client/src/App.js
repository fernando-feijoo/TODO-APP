import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";

function App() {
  const [todoId, setTodoId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editList, setEditList] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const titleWOS = title.trim();
  const descriptionWOS = description.trim();
  const categoryWOS = category.trim();

  const getTodoList = () => {
    Axios.get(process.env.REACT_APP_LOCALHOST + "/todos").then((response) => {
      setTodoList(response.data);
    });
  };

  const loadItemsByCategory = (categoryName) => {
    Axios.get(
      process.env.REACT_APP_LOCALHOST + `/todos/categories/${categoryName}`
    ).then((response) => {
      setTodoList(response.data);
    });
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    if (newCategory) {
      loadItemsByCategory(newCategory);
    } else {
      getTodoList();
    }
  };

  const getCategories = () => {
    Axios.get(process.env.REACT_APP_LOCALHOST + "/todos/categories").then(
      (response) => {
        setCategoryList(response.data);
      }
    );
  };

  const addTodo = () => {
    Axios.post(process.env.REACT_APP_LOCALHOST + "/todos", {
      title: titleWOS,
      description: descriptionWOS,
      category: categoryWOS,
      completed: completed,
    })
      .then(() => {
        getTodoList();
        resetForm();
        getCategories();
        Swal.fire("Good job!", "New Data Added", "success");
      })
      .catch((error) => {
        console.error("Error in the request:", error);
      });
  };

  const updateTodo = () => {
    Axios.put(`${process.env.REACT_APP_LOCALHOST}/todos/${todoId}`, {
      title: titleWOS,
      description: descriptionWOS,
      category: categoryWOS,
      completed: completed,
    })
      .then(() => {
        getTodoList();
        resetForm();
        getCategories();
        Swal.fire("Good job!", "Updated Data", "success");
      })
      .catch((error) => {
        console.error("Error in the request:", error);
      });
  };

  const patchTodo = (val) => {
    return () => {
      const updatedCompleted = !val.completed;
      Axios.patch(`${process.env.REACT_APP_LOCALHOST}/todos/${val.todo_id}`, {
        completed: updatedCompleted,
      })
        .then(() => {
          if (!selectedCategory) {
            getTodoList();
          } else {
            loadItemsByCategory(selectedCategory);
          }
          resetForm();
          getCategories();
          Swal.fire({
            title: "<strong>Good job!</strong>",
            html: "<i>Marked Data</i>",
            icon: "success",
            timer: 3000,
          });
        })
        .catch((error) => {
          console.error("Error in the request:", error);
        });
    };
  };
  const handleDelete = (todoId) => {
    deleteTodo(todoId);
  };

  const deleteTodo = (todoId) => {
    Axios.delete(`${process.env.REACT_APP_LOCALHOST}/todos/${todoId}`)
      .then(() => {
        getTodoList();
        resetForm();
        getCategories();
        Swal.fire("Good job!", "Deleted Data", "success");
      })
      .catch((error) => {
        console.error("Error in the request:", error);
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

  useEffect(() => {
    getCategories();
    getTodoList();
  }, []);

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
              <button className="btn btn-warning me-3" onClick={updateTodo}>
                Edit
              </button>

              <button className="btn btn-info ms-3" onClick={resetForm}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={addTodo}>
              Save
            </button>
          )}
        </div>
      </div>

      <select
        className="form-select form-select-lg mb-3 mt-3"
        aria-label=".form-select-lg example"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select a Category</option>
        {categoryList.map((val, index) => (
          <option key={index} value={val.category}>
            {val.category}
          </option>
        ))}
      </select>

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              #
            </th>
            <th className="text-center" scope="col">
              Title
            </th>
            <th className="text-center" scope="col">
              Description
            </th>
            <th className="text-center" scope="col">
              Category
            </th>
            <th className="text-center" scope="col">
              Completed/Incomplete
            </th>
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
                    onChange={patchTodo(val)}
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
                    <button
                      type="button"
                      onClick={() => handleDelete(val.todo_id)}
                      className="btn btn-danger"
                    >
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
