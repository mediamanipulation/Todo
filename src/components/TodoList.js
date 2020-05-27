import React from "react";

import TodoForm from "./TodoForm";
import Todo from "./Todo";
/*
  TodoMVC
 - 1. add todo
 - 2. display todos
 - 3. cross off todo
 - 4. show number of active todos
 - 5. filter all/active/complete
 - 6. delete todo
 - 7. delete all complete
   - 7.1 only show if atleast one is complete
 - 8. button to toggle all on/off
*/

export default class TodoList extends React.Component {
  state = {
    todos: [],
    todosToShow: "all",
    toggleAllComplete: true,
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          // supposed to update
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    });
  };

  updateTodoToShow = (s) => {
    this.setState({
      todosToShow: s,
    });
  };

  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  removeAllTodosThatAreComplete = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.complete),
    });
  };

  render() {
    let todos = [];

    if (this.state.todosToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todosToShow === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todosToShow === "complete") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }

    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
          />
        ))}
        <div>
          todos left: {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <button onClick={() => this.updateTodoToShow("all")}>All</button>
        <button onClick={() => this.updateTodoToShow("active")}>Active</button>
        <button onClick={() => this.updateTodoToShow("complete")}>
          Complete
        </button>
        {this.state.todos.some((todo) => todo.complete) ? (
          <div>
            <button onClick={this.removeAllTodosThatAreComplete}>
              Remove All Complete Todos
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState((state) => ({
                todos: this.state.todos.map(todo => ({
                  ...todo,
                  complete: state.toggleAllComplete
                })),
                toggleAllComplete: !state.toggleAllComplete,
              }))
            }
          >
            Toggle All Complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}
