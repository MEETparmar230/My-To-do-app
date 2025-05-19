import { useState, useEffect } from "react";
import axios from "axios";

export default function Todolist() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Get all todos
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!task) return;
    axios
      .post("http://localhost:5000/api/todos", { text: task })
      .then((res) => {
        setTodos([...todos, res.data]);
        setTask("");
      });
  };

  // Toggle
  const toggleComplete = (id, completed) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}`, {
        completed: !completed,
      })
      .then((res) => {
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      });
  };

  // Delete task 
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  // Event handler for input
  const updateTask = (event) => {
    setTask(event.target.value);
  };

  // Mark all tasks as done
  const markAllAsDone = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: true,
    }));
    setTodos(updatedTodos);
    updatedTodos.forEach((todo) => {
      if (!todo.completed) toggleComplete(todo._id, false);
    });
  };

  // Delete all tasks
  const deleteAll = () => {
    todos.forEach((todo) => {
      deleteTodo(todo._id);
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a task"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={updateTask}
          value={task}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`flex justify-between items-center p-2 border rounded ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
            <div>
              <button
                className="text-green-500 hover:text-green-700 mx-2"
                onClick={() => toggleComplete(todo._id, todo.completed)}
              >
                {todo.completed ? (
                  <i className="fa-solid fa-check-circle text-green-500"></i>
                ) : (
                  <i className="fa-regular fa-circle text-gray-500"></i>
                )}
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <div className="mt-4 flex justify-between">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={markAllAsDone}
          >
            Mark All as Done
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={deleteAll}
          >
            Delete All
          </button>
        </div>
      )}
    </div>
  );
}
