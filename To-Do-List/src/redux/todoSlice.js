import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const API_URL = `${url}/api/todos`;

const normalizeTodo = (todo) => ({
  ...todo,
  id: todo._id || todo.id,
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data.map(normalizeTodo);
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const response = await axios.post(API_URL, { text });
  return normalizeTodo(response.data.saved);
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async ({ id, completed }) => {
  const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
  return normalizeTodo(response.data);
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const markAllAsDone = createAsyncThunk("todos/markAllAsDone", async () => {
  const res = await axios.put(`${API_URL}/mark-all`);
  return res.data.map(normalizeTodo);
});

export const deleteAllTodos = createAsyncThunk("todos/deleteAllTodos", async () => {
  await axios.delete(`${API_URL}`);
  return [];
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //FETCH TODOS 
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message.includes("Failed to fetch")
          ? "Backend is waking up... please wait!"
          : action.error.message;
      })

      //ADD TODO
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //TOGGLE TODO
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //DELETE TODO
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //MARK ALL DONE
      .addCase(markAllAsDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAllAsDone.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(markAllAsDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //DELETE ALL TODOS
      .addCase(deleteAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllTodos.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(deleteAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
