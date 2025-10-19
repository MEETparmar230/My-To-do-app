package com.example.todoList.repositories;

import com.example.todoList.models.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String>{
}
