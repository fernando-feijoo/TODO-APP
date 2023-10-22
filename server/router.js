import express from "express";
import pool from "./index.js";

const router = express.Router();

// #region Test

router.get("/", (req, res) => {
  res.send("This is the home page");
});

router.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});

// #endregion Test

// Create a new TODO item
router.post("/todos", async (req, res) => {
  try {
    const { title, description, completed, user_id, category_id } = req.body;
    const query = `
            INSERT INTO TodoItems (title, description, completed, user_id, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
    const values = [title, description, completed, user_id, category_id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a new TODO item" });
  }
});

// Retrieve a list of TODO items
router.get("/todos", async (req, res) => {
  try {
    const query = "SELECT * FROM TodoItems";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error retrieving the list of TODO items" });
  }
});

// Update an existing TODO item
router.put("/todos/:id", async (req, res) => {
  try {
    const { title, description, completed, user_id, category_id } = req.body;
    const todoId = req.params.id;
    const query = `
            UPDATE TodoItems
            SET title = $1, description = $2, completed = $3, user_id = $4, category_id = $5
            WHERE todo_id = $6
            RETURNING *
        `;
    const values = [
      title,
      description,
      completed,
      user_id,
      category_id,
      todoId,
    ];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating a TODO item" });
  }
});

// Mark a TODO item as completed or incomplete
router.patch("/todos/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    const todoId = req.params.id;
    const query = `
            UPDATE TodoItems
            SET completed = $1
            WHERE todo_id = $2
            RETURNING *
        `;
    const values = [completed, todoId];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error marking a TODO item as completed or incomplete",
    });
  }
});

// Delete a TODO item
router.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const query = "DELETE FROM TodoItems WHERE todo_id = $1";
    const values = [todoId];
    await pool.query(query, values);
    res.json({ message: "TODO item successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting a TODO item" });
  }
});

export default router;
