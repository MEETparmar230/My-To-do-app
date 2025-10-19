package com.example.todoList.controllers;

import com.example.todoList.models.Todo;
import com.example.todoList.services.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // ✅ Get all todos
    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getAllTodos();
    }

    // ✅ Get single todo
    @GetMapping("/{id}")
    public Optional<Todo> getTodo(@PathVariable String id) {
        return todoService.getTodo(id);
    }

    // ✅ Create todo (frontend expects `{ saved: {...} }`)
    @PostMapping
    public Map<String, Object> createTodo(@RequestBody Todo todo) {
        Todo saved = todoService.createTodo(todo);
        Map<String, Object> response = new HashMap<>();
        response.put("saved", saved);
        return response;
    }

    // ✅ Toggle todo (frontend expects todo object directly)
    @PutMapping("/{id}")
    public ResponseEntity<Todo> toggleStatus(@PathVariable String id) {
        Todo updated = todoService.toggleStatus(id);
        return ResponseEntity.ok(updated);
    }

    // ✅ Mark all done (frontend expects array)
    @PutMapping("/mark-all")
    public ResponseEntity<List<Todo>> markAllAsDone() {
        List<Todo> updated = todoService.markAllDone();
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete single todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Delete all todos
    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        todoService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
