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

INSERT INTO TodoItems (title, description, category)
VALUES ('My first todo item', 'This is my first todo item.', 'Personal');