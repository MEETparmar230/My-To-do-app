package com.example.todoList.services;

import com.example.todoList.models.Todo;
import com.example.todoList.repositories.TodoRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodo(String id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        if (todo.getTitle() == null) todo.setTitle("");
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    public Todo toggleStatus(String id) {
        ObjectId objectId;

        try {
            objectId = new ObjectId(id); // convert string to ObjectId
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid todo ID: " + id);
        }

        Optional<Todo> optionalTodo = todoRepository.findById(objectId.toString());
        // or use findById(objectId) if your repository supports ObjectId

        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setCompleted(!todo.isCompleted());
            return todoRepository.save(todo);
        } else {
            throw new RuntimeException("Todo not found with id: " + id);
        }
    }

    public List<Todo> markAllDone() {
        List<Todo> todos = todoRepository.findAll();
        for (Todo todo : todos) {
            todo.setCompleted(true);
        }
        return todoRepository.saveAll(todos);
    }

    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }

    public void deleteAll() {
        todoRepository.deleteAll();
    }
}
