package com.example.todoList.models;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "todos")
public class Todo {
    @Id
    private ObjectId _id; // <-- use ObjectId

    private String title;
    private boolean completed;

    public String get_id() {
        return _id != null ? _id.toString() : null;
    }
}


