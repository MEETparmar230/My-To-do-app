import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  markAllAsDone,
  deleteAllTodos
} from './redux/todoSlice';

export default function Todolist() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [task, setTask] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTask = () => {
    if (task.trim()) {
      dispatch(addTodo(task)).then(() => {
        setTask("");
        toast.success("Task added");
      });
    }
  };

  const toggleComplete = (todo) => {
    dispatch(toggleTodo({ 
      id: todo._id || todo.id, // Handle both cases
      completed: todo.completed 
    }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id)).then(() => {
      toast.success("Task deleted");
    });
  };

  const updateTask = (event) => setTask(event.target.value);

  const handleMarkAll = () => {
    dispatch(markAllAsDone()).then(() => {
      toast.success("All tasks marked as done");
    });
  };

  const deleteAllTodo = () => {
    dispatch(deleteAllTodos()).then(() => {
      toast.success("All tasks deleted");
    });
  };

  return (
    <div className="bg-zinc-100 min-h-screen p-4">
      <div className="max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg bg-gray-100 border border-zinc-300">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center mb-4 text-zinc-700">Tasks</h1>
        
        <form className="flex mb-4" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
          <input
            type="text"
            placeholder="Add a task"
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={updateTask}
            value={task}
          />
          <button
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id || todo.id} // Use either _id or id
              className={`flex items-start p-2 border rounded ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className="break-words">{todo.text}</p>
              </div>
              <div className="flex-shrink-0 mt-1">
                <button
                  className="text-green-500 hover:text-green-700 mx-2"
                  onClick={() => toggleComplete(todo)}
                >
                  {todo.completed ? (
                    <i className="fa-solid fa-check-circle text-green-500"></i>
                  ) : (
                    <i className="fa-regular fa-circle text-gray-500"></i>
                  )}
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(todo._id || todo.id)} // Use either _id or id
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
              onClick={handleMarkAll}
            >
              Mark All as Done
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={deleteAllTodo}
            >
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}