import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";
import Todo from "./Todo";

type TTodo = {
  id: string;
  title: string;
  description: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TTodo[]>([]);

  async function handleCreateTodo(e: React.FormEvent) {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/todos", {
      title,
      description,
    });
    const res = await fetch("http://localhost:3000/todos");
    const getTodos = await res.json();
    setTodos(getTodos);
    setTitle("");
    setDescription("");
  }

  async function handleDeleteTodo(todoId: string) {
    await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/todos");
      const getTodos = await response.json();
      setTodos(getTodos);
    };
    getTodos();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleCreateTodo}
        className="flex flex-col m-1 items-center"
      >
        <label htmlFor="todo-title">Todo's Title</label>
        <input
          className="border-2 rounded px-4 py-1"
          placeholder="Enter Title"
          id="todo-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <br />
        <label htmlFor="todo-description">Todo's Description</label>
        <input
          className="border-2 rounded px-4 py-1"
          type="text"
          placeholder="Enter description"
          id="todo-description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <br />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Todo
        </button>
      </form>
      <ul className="grid grid-cols-3 gap-4 items-center mt-4 w-3/4 h-20">
        {todos.map((todo) => (
          <div>
            <li
              key={todo.id}
              className="relative h-44 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-400 dark:hover:bg-gray-600"
            >
              <button
                className="absolute bg-red-600 hover:bg-red-700 top-1 right-1 p-1.5 rounded-lg text-base leading-none"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                X
              </button>
              <Routes>
                <Route path="todos/:todoId" element={<Todo />} />
              </Routes>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <Link to={`todos/${todo.id}`}>{todo.title}</Link>
              </h5>

              <hr className="border border-white h-px mt-2 mb-4" />
              <p className="flex flex-row items-center font-normal text-gray-700 dark:text-gray-400 mt-2 text-balance">
                <Link to={`todos/${todo.id}`}>{todo.description}</Link>
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
