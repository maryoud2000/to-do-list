import React from 'react';
import './App.css';

function Todo({ todo, index, ongoingTodo, completeTodo, removeTodo }) {
  return (
    <div className="todo"
    style={{ backgroundColor: todo.isCompleted ? "green" : todo.isOnGoing ? "Yellow" : "" }}
    >
      {todo.text}
      <div>    
        <button onClick={() => ongoingTodo(index)}>Ongoing</button>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
};

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={event => setValue(event.target.value)}/>
      <p>Enter new task</p>
    </form>
  );
}

function App() { 
  const [todos, setTodos] = React.useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text, isOnGoing: false, isCompleted: false }];
    setTodos(newTodos);
  };

  const ongoingTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isOnGoing = true;
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <h1>To Do List</h1>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            ongoingTodo={ongoingTodo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
