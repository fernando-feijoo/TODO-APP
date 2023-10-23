import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(false); // Inicializado como false

  const add = () => {
    const completedValue = status === "on"; // Convertir "on" a true y cualquier otro valor a false
    Axios.post("http://localhost:4000/todos", {
      title: title,
      description: description,
      category: category,
      completed: completedValue,
    }).then(() => {
      alert("New register added. ", completedValue);

      // Restablecer los valores de los campos del formulario
      setTitle("");
      setDescription("");
      setCategory("");
      setStatus(false); // Opcionalmente, puedes reiniciar el estado del checkbox a "false"
    });
  };

  return (
    <div className="App">
      <div className="datos">
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
        <button onClick={add}>Save</button>
      </div>
    </div>
  );
}

export default App;
