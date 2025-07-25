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
  const { loading, error } = useSelector((state) => state.todos);
  const [addLoading, setAddLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);


  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTask = () => {
    if (task.trim()) {
      setAddLoading(true);
      dispatch(addTodo(task)).then(() => {
        setTask("");
        toast.success("Task added");
      })
        .finally(() => setAddLoading(false));
    }
  };


  const handleDelete = (id) => {
    setDeletingId(id);
    dispatch(deleteTodo(id))
      .then(() => toast.success("Task deleted"))
      .finally(() => setDeletingId(null));
  };

  const toggleComplete = (todo) => {
    setTogglingId(todo._id);
    dispatch(toggleTodo({
      id: todo._id || todo.id,
      completed: todo.completed
    }))
      .finally(() => setTogglingId(null));
  };



  const updateTask = (event) => {
    setTask(event.target.value);
  }

  const handleMarkAll = () => {
    setActionLoading(true);
    dispatch(markAllAsDone()).then(() => {
      toast.success("All tasks marked as done");
    }).finally(() => setActionLoading(false));
  };

  const deleteAllTodo = () => {
    setDeleteAllLoading(true);
    dispatch(deleteAllTodos()).then(() => {
      toast.success("All tasks deleted");
    }).finally(() => setDeleteAllLoading(false));
  };


  if (loading && todos.length === 0) {
    return <div className="text-center mt-10">Backend is waking up... ⏳</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-lg mx-auto md:mt-10 lg:mt-10 mt-5  p-6 rounded-lg shadow-lg bg-gray-100 border border-zinc-300">
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
            {addLoading ? 'Adding...' : 'Add'}
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`flex items-start p-2 border rounded ${todo.completed ? "line-through text-gray-500" : ""
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
                  {togglingId === todo._id ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : todo.completed ? (
                    <i className="fa-solid fa-check-circle text-green-500"></i>
                  ) : (
                    <i className="fa-regular fa-circle text-gray-500"></i>
                  )}
                </button>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(todo._id)}
                >
                  {deletingId === todo._id ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-trash"></i>
                  )}                </button>
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
              {actionLoading ? 'Marking All as done...' : 'Mark All as Done'}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={deleteAllTodo}
            >
              {deleteAllLoading ? 'Deleting all...' : 'Delete All'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}