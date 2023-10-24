import express from "express";
import pool from "./index.js";

const router = express.Router();

// #region Home

router.get("/", (req, res) => {
  res.send("I hope the best for this job. Pray 🙏🏻");
});

// #endregion Home

// Retrieve a list of TODO items
router.get("/todos", async (req, res) => {
  try {
    const query = "SELECT * FROM TodoItems ORDER BY todo_id ASC";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving the list of TODO items" });
  }
});

// Create a new TODO item
router.post("/todos", async (req, res) => {
  try {
    const { title, description, category, completed } = req.body;
    const query = `
            INSERT INTO TodoItems (title, description, category, completed)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
    const values = [title, description, category, completed];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a new TODO item" });
  }
});

// Update an existing TODO item
router.put("/todos/:id", async (req, res) => {
  try {
    const { title, description, category, completed } = req.body;
    const todoId = req.params.id;
    const query = `
            UPDATE TodoItems
            SET title = $1, description = $2, category = $3, completed = $4
            WHERE todo_id = $5
            RETURNING *
        `;
    const values = [title, description, category, completed, todoId];
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

router.get("/todos/categories", async (req, res) => {
  try {
    const query =
      "SELECT DISTINCT category FROM TodoItems ORDER BY category ASC";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error retrieving the list of unique categories" });
  }
});

router.get("/todos/categories/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const query =
      "SELECT * FROM TodoItems WHERE category = $1 ORDER BY todo_id ASC";
    const result = await pool.query(query, [categoryName]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error retrieving the items for the specified category" });
  }
});

export default router;
