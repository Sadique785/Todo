import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toDo.trim() !== '') {
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
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="app-subsection">
          <div className="subHeading">
            <br />
            <h2>Stay productive! 📈</h2>
          </div>
          <div className="input">
            <input
              type="text"
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              placeholder="🖊️ Add item..."
            />
            <i onClick={handleSubmit} className="fas fa-plus"></i>
          </div>
          <div className="todos">
            {lastThreeTodos.map((obj) => (
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
                  <i className="fas fa-times" onClick={() => handleDelete(obj.id)}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="app-right">
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
  );
}

export default App;
