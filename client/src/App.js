import "./App.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const showTitle = () => {
    alert(status)
  };

  return (
    <div className="App">
      <div className="datos">
        <label>
          Title: <input 
          onChange={(event)=>{
            setTitle(event.target.value);
          }}
          type="text" />
        </label>
        <label>
          Description: <input 
          onChange={(event)=>{
            setDescription(event.target.value);
          }}
          type="text" />
        </label>
        <label>
          Category: <input 
          onChange={(event)=>{
            setCategory(event.target.value);
          }}
          type="text" />
        </label>
        <label>
          Completed/Incomplete: <input 
          onChange={(event)=>{
            setStatus(event.target.value);
          }}
          type="checkbox" />
        </label>
        <button onClick={showTitle}>Save</button>
      </div>
    </div>
  );
}

export default App;
