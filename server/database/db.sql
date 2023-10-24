CREATE TABLE
    Users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        password VARCHAR(100)
    );

CREATE TABLE IF NOT EXISTS
    TodoItems (
        todo_id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        description TEXT,
        category VARCHAR(50),
        completed BOOLEAN DEFAULT 'false'
    );

ALTER SEQUENCE TodoItems_todo_id_seq RESTART WITH 1;