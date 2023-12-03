#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

class TodoApp {
  private todos: Todo[] = [];

  constructor() {}

  addTodo() {
    inquirer
      .prompt({
        type: "input",
        name: "description",
        message: "Enter task description:",
      })
      .then(({ description }) => {
        const newTodo: Todo = {
          id: this.todos.length + 1,
          description,
          completed: false,
        };

        this.todos.push(newTodo);

        console.log(chalk.green("Todo added successfully!"));
      })
      .catch((error: { message: unknown; }) => {
        console.error(chalk.red(error.message));
      });
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  markTodoAsCompleted(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      console.log(chalk.red("Invalid todo ID."));
      return;
    }

    todo.completed = true;

    console.log(chalk.green("Todo marked as completed successfully!"));
  }

  removeTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      console.log(chalk.red("Invalid todo ID."));
      return;
    }

    this.todos.splice(this.todos.indexOf(todo), 1);

    console.log(chalk.green("Todo removed successfully!"));
  }

  displayTodos() {
    console.clear();

      console.log();
      console.log("Todos:");

      this.todos.forEach((todo) => {
        const status = todo.completed ? chalk.green("[x]") : chalk.red("[ ]");
        console.log(`${status} ${todo.description}`);
      });
    }
}

const todoApp = new TodoApp();

todoApp.displayTodos();

inquirer
  .prompt({
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: ["Add Todo", "Mark Todo As Completed", "Remove Todo", "Exit"],
  })
  .then(({ action }) => {
    switch (action) {
      case "Add Todo":
        todoApp.addTodo();
        break;
      case "Mark Todo As Completed":
        inquirer
          .prompt({
            type: "number",
            name: "id",
            message: "Enter todo ID to mark as completed:",
          })
          .then(({ id }) => {
            todoApp.markTodoAsCompleted(id);
          });
        break;
      case "Remove Todo":
        inquirer
          .prompt({
            type: "number",
            name: "id",
            message: "Enter todo ID to remove:",
          })
          .then(({ id }) => {
            todoApp.removeTodo(id);
          });
        break;
      case "Exit":
        process.exit();
        break;
    }

    setTimeout(() => {
      todoApp.displayTodos();
    }, 1000);    
  })
  .catch((error: { message: unknown; }) => {
    console.error(chalk.red(error.message));
  });
  