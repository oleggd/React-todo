import React from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

const App = () => {
  //const isLoggedIn = false;
  //const loginBox = <span> Log in please </span>;
  //const welcomeBox = <span> Welcome Back </span>
  // <!--{ isLoggedIn ? welcomeBox : loginBox }-->
  const todoData = [
    { label: 'Learn React', important: false, id: 1 },
    { label: 'Build Application', important: true, id: 2 },
    { label: 'Test Application', important: false, id: 3 }     
  ];

  return (
    <div className="todo-app">
        <AppHeader toDo={1} done={3}/>
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList todos={ todoData }/>
    </div>
    );
}

export default App;