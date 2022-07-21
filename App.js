import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  // An array of "todos"
  const [todos, setTodos] = useState([])
  // To keep track of the current 'todo' that we use
  const [todo, setTodo] = useState([])
  // Edit Functionality Uses 2 components
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")
  //Add Function
  // 'e' is the event object, the event is the change in the HTML element 'input text'
  function addTodo(e){
    //By default forms refresh when they are submitted
    e.preventDefault()
    //Think of this like a new Node in a linked list
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complete: false,
    }
    // Adds this "newTodo" to the array, almost like a node to a linked list 
    setTodos([...todos].concat(newTodo))
    // Reset input to blank, so you don't add the same "todo"
    setTodo("")
  }
  // Delete Function
  function deleteTodo(id){
    // the filter function returns a new array with all elements that satisfy the logic
    const updatedArray = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedArray)
  }
  // Checkbox Function
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) =>{
      todo.id === id? todo.complete = !todo.complete: todo.complete = todo.complete
      return todo
    })
    setTodos(updatedTodos)
  }
  // Edit Todo Function
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) =>{
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    //Reset Editing Logic
    setTodoEditing(null)
    setEditingText("")
  }
  return ( 
    <div className="App">
      <h1>To-Do List Project</h1>
      <form onSubmit={addTodo}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type="submit">Add To-Do</button>
      </form>
      {todos.map((todo) => <div key={todo.id}>

        {todoEditing == todo.id ? 
          (<input 
          type="text" 
          onChange={(e) => setEditingText(e.target.value)}
          value={editingText} />) 
          : 
          (<div>{todo.text}</div>)}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>

          <input 
          type="checkbox" 
          onChange={() => toggleComplete(todo.id)}
          checked={todo.complete}/>

          {todoEditing === todo.id ? 
          ( <button onClick={() => editTodo(todo.id)}>Submit Edits</button>) 
          : 
          (<button onClick={() => setTodoEditing(todo.id)}>Edit To-Do</button>)}
        </div>)}
    </div>
  );
}

export default App;
