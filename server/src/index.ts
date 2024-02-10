import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import pool from "./db";
const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    // console.log(result);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting todos");
  }
});

app.post("/todos", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const id = uuidv4();
  try {
    const newTodo = await pool.query(
      "INSERT INTO todos (id, title, description) VALUES ($1,$2,$3)",
      [id, title, description]
    );
    res.json(newTodo);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/todos/:todoId", async (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  try {
    const removeTodo = await pool.query("DELETE FROM todos WHERE id=$1", [
      todoId,
    ]);
    if (removeTodo.rowCount === 0) {
      return res.status(404).send("The specified resource could not be found.");
    }
    res.status(200).send("Successfully deleted the Todo");
  } catch {
    res.status(500).send("Server error");
  }
});

app.get("/todos/:todoId/cards", async (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  const todo = await pool.query("SELECT * FROM todos WHERE id=$1", [todoId]);

  res.json(todo.rows);
  console.log(todo.rows);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
