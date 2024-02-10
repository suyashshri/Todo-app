import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TTodo = {
  id: string;
  title: string;
  description: string;
};

export default function Todo() {
  let params = useParams();
  const todoId = params.todoId;
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
  } as TTodo);

  // Fetch the data for this particular todo item when the component mounts

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        `http://localhost:3000/todos/${todoId}/cards`
      );
      const getTodo = await response.json();
      setTodo(getTodo[0]);
    };
    getTodos();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className=" text-5xl p-5">{todo.title}</h1>
      <hr className="border border-black h-px mt-2 mb-4 " />
      <p className="text-2xl">{todo.description}</p>
    </div>
  );
}
