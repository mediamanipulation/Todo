import React from "react";

import TodoFormPat from "./TodoFormPat";
import TodoPat from "./TodoPat";
/*
  TodoMVC
 - 1. add todo
 - 2. display todos
  3. cross off todo
  4. show number of active todos
  5. filter all/active/complete
  6. delete todo
  7. delete all complete
    7.1 only show if atleast one is complete
  8. button to toggle all on/off
*/

export default class TodoListPat extends React.Component {
  state = {
    todos: [],
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  render() {
    return (
      <div>
        <TodoFormPat onSubmit={this.addTodo} />
        {this.state.todos.map((todo) => (
          <TodoPat key={todo.id} text={todo.text} />
        ))}
      </div>
    );
  }
}
