import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

// Helper to normalize todo objects
const normalizeTodo = (todo) => ({
  ...todo,
  id: todo._id || todo.id, // Handle both cases
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data.map(normalizeTodo);
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await axios.post(API_URL, { text });
  return normalizeTodo(response.data.saved);
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async ({ id, completed }) => {
  const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
  return normalizeTodo(response.data);
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const markAllAsDone = createAsyncThunk('todos/markAllAsDone', async () => {
  const res = await axios.put(`${API_URL}/mark-all`);
  return res.data.map(normalizeTodo); 
});

export const deleteAllTodos = createAsyncThunk('todos/deleteAllTodos', async () => {
  await axios.delete(`${API_URL}`);
  return [];
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      .addCase(markAllAsDone.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteAllTodos.fulfilled, (state) => {
        state.items = [];
      });
  }
});

export default todoSlice.reducer;