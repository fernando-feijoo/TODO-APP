# TODO Application

## Challenge Description

Welcome to the TODO Application Code Challenge! In this challenge, you will develop an application that allows users to create and categorize tasks (TODO). This application consists of a frontend component and a backend component.

## Challenge Requirements

### Frontend
- Implement a frontend application using any frontend technology of your choice, such as React, Vue.js, or Angular, that provides the following functionality:
  - Users can view a list of TODO items.
  - Users can add a new TODO item with a title, description, and category.
  - Users can edit existing TODO items (title, description, category).
  - Users can mark TODO items as completed or incomplete.
  - Users can filter TODO items by category.
  - Users can delete TODO items.

### Backend
- Implement a backend API that supports the frontend application. The backend should provide endpoints for the following operations:
  - Create a new TODO item.
  - Retrieve a list of TODO items.
  - Update an existing TODO item.
  - Mark a TODO item as completed or incomplete.
  - Delete a TODO item.

### Bonus Points
- Implement user authentication to secure the application.
- Deploy the application to a cloud environment, such as AWS, Azure, or Heroku.
- Write unit and/or interaction tests to ensure the reliability of your application.

## Setup and Execution Instructions

1. Clone this repository to your local machine.
2. In the `client` folder, create a `.env` file and add the following line:

```zsh
REACT_APP_LOCALHOST=http://localhost:4000
```

3. In the `server` folder, create a `.env` file and add the following lines:

```zsh
DATABASE_URL=postgres://feijoo:UjgFubtJcWvstoSQyAGK12VHWkVW8xft@dpg-ckqkjcg5vl2c7387pk30-a.oregon-postgres.render.com/tododb_ja81
SSL_ENABLED=true
```

4. Open a terminal in the `server` folder and run the following commands:

```zsh
node install
```

5. Then, run the following command to start the server application:

```zsh
node index
```

6. Open another terminal in the `client` folder and run the following command to install Bootstrap:

```zsh
npm install
```

7. Then, run the following command to start the client application:

```zsh
npm start
```

## Links

- Frontend: [https://work-project-frontend.onrender.com/](https://work-project-frontend.onrender.com/)
- Backend: [https://work-project-w5c1.onrender.com/](https://work-project-w5c1.onrender.com/)

## Compliance with Requirements

The following requirements have been met:

- Users can view a list of TODO items.
- Users can add a new TODO item with a title, description, and category.
- Users can edit existing TODO items (title, description, category).
- Users can mark TODO items as completed or incomplete.
- Users can filter TODO items by category.
- Users can delete TODO items.

In addition, on the backend, the following requirements have been met:

- Create a new TODO item.
- Retrieve a list of TODO items.
- Update an existing TODO item.
- Mark a TODO item as completed or incomplete.
- Delete a TODO item.

## Bonus Point

The application has been deployed in a cloud environment using [Render](https://render.com/).

Thank you for reviewing our application!
