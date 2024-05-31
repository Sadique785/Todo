import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import logo192 from '../../todo/public/logo192.png'

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editId, setEditId] = useState(null)
  const [editText, seteditText] = useState('')
  
  
  const handleEdit= (id, text)=>{

    setEditId(id);
    seteditText(text);
    console.log(editId);
    console.log(editText)
}


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId){ 
      const filteredTodo = toDos.find((todo) => todo.id === editId);
      console.log(filteredTodo.status, filteredTodo.text);
      if (filteredTodo){
        const updatedTodos = toDos.filter((todo) => todo.id !== editId);
        const updatedTodo = {id:editId, text:editText, status:filteredTodo.status};
        setToDos([...updatedTodos, updatedTodo]);
      }
      
      setEditId(null);
      seteditText('');
    }
    else if (toDo.trim() !== '') {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo('');
    }
  };

  const handleDelete = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };




  const lastThreeTodos = toDos.slice(-3).reverse();
  const activeTodos = toDos.filter((todo) => !todo.status);
  const inactiveTodos = toDos.filter((todo) => todo.status);

  return (
    <div className="app-outer">
      <div className="app">
        <div className="app-heading">
          <h1>ToDo List</h1>
        </div>
        <div className="app-content">
          <div className="app-subsection">
            <div className="subHeading">
              <h2>Stay productive! 📈</h2>
            </div>
            <div className="input">
              <input
                type="text"
                value={editId ? editText :toDo}
                onChange={(e) =>
                  editId ?seteditText(e.target.value) :setToDo(e.target.value)
                }
                placeholder="🖊️ Add item..."
              />
              <i onClick={handleSubmit} className="fas fa-plus"></i>
            </div>
            <div className="todos">
              {toDos.map((obj) => (
                <div className="todo" key={obj.id}>
                  <div className="left">
                    <input
                      onChange={(e) => {
                        setToDos(
                          toDos.map((todo) => {
                            if (todo.id === obj.id) {
                              return { ...todo, status: e.target.checked };
                            }
                            return todo;
                          })
                        );
                      }}
                      checked={obj.status}
                      type="checkbox"
                    />
                    <p>{obj.text}</p>
                  </div>
                  <div className="right">
                    <i
                      className="fas fa-edit"
                      onClick={() => handleEdit(obj.id, obj.text)}
                    ></i>
                    <i
                      className="fas fa-times"
                      onClick={() => handleDelete(obj.id)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="app-side">
            <div className="activeTodos">
              <h3>Active Items</h3>
              {activeTodos.map((todo) => (
                <p key={todo.id}>{todo.text}</p>
              ))}
            </div>
            <div className="inactiveTodos">
              <h3>Inactive Items</h3>
              {inactiveTodos.map((todo) => (
                <p key={todo.id}>{todo.text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
