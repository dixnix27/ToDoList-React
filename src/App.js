// import TestComponent from './components/TestComponent';
import { Component } from "react";
import "./App.css";

const LOCALSTORAGE_KEY = "todos";

class App extends Component {
  constructor() {
    super();
    const localStorageTodos = window.localStorage.getItem(LOCALSTORAGE_KEY);
    this.state = {
      todoList: localStorageTodos ? JSON.parse(localStorageTodos) : [],
      inputValue: "",
    };
  }

  manageLocalStorage = (todos) => {
    const jsonTodos = JSON.stringify(todos);
    window.localStorage.setItem(LOCALSTORAGE_KEY, jsonTodos);
    this.setState({ todoList: todos });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({ inputValue: event.target.value });
    console.log("Input Value:", this.state.inputValue);
  };

  addTodo = (event) => {
    event.preventDefault();
    if (this.state.inputValue !== "") {
      const newTodoList = [
        ...this.state.todoList,
        {
          task: this.state.inputValue,
          id: Date.now(),
          completed: false,
        },
      ];
      this.manageLocalStorage(newTodoList);
    }
    this.setState({ inputValue: "" });
  };

  markAsCompleted = (id) => {
    const updatedTodos = this.state.todoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    this.setState({ todoList: updatedTodos });
  };

  removeTodo = () => {
    const filteredTodos = this.state.todoList.filter(
      (todo) => todo.completed === false
    );
    this.setState({ todoList: filteredTodos });
  };

  render() {
    console.log("todos:", this.state.todoList);
    return (
      <div className="App">
        {/* <TestComponent></TestComponent> */}
        <div style={{ margin: "30px" }}>
          <form onSubmit={this.addTodo}>
            <input
              type="text"
              placeholder="Add To Do..."
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            ></input>
            <button>Add To Do</button>
            <button onClick={() => this.removeTodo()}>Revome To Do</button>
          </form>
        </div>

        {this.state.todoList.map((todo) => {
          return (
            <ul key={todo.id} style={{ listStyleType: "none" }}>
              <li
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => this.markAsCompleted(todo.id)}
              >
                {todo.task}
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default App;
