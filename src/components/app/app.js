import React, { Component } from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddFrom from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Learn React'),
      this.createTodoItem('Build Application'),
      this.createTodoItem('Test Application')  
    ]
  }

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }; 
  }

  deleteItem = (id) => {

    this.setState(({todoData}) => {
      const idx = todoData.findIndex((elm) => elm.id === id );
      console.log('deliting', idx);
      const newTodoData = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx+1)
      ]; 

      return {
        todoData: newTodoData
      }
    });
  }

  addItem = (item) => {
    // generate id
    const newItem = this.createTodoItem(item);  

    // add element in array
    this.setState(({todoData}) => {
      //const idx = todoData.findIndex((elm) => elm.id === id );
      const newTodoData = [...todoData, newItem];
      console.log('adding', newTodoData);

      return {
        todoData: newTodoData
      } 
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((elm) => elm.id === id );
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    const newArr = [
        ...arr.slice(0, idx), 
        newItem,
        ...arr.slice(idx+1)
    ];

    return newArr;
  }
  onToggleImportant = (id) => {
    console.log('Important', id);
    // add element in array
    this.setState(({todoData}) => {
      /* toggleProperty(todoData, id, 'important');
      const idx = todoData.findIndex((elm) => elm.id === id );
      const oldItem = todoData[idx];
      const newItem = {...oldItem, important: !oldItem.important};

      const newTodoData = [
        ...todoData.slice(0, idx), 
        newItem,
        ...todoData.slice(idx+1)
      ];  */

      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      } 
    });
  }

  onToggleDone = (id) => {
    console.log('Done', id);
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((elm) => elm.id === id );
      const oldItem = todoData[idx];
      const newItem = {...oldItem, done: !oldItem.done};
 
      const newTodoData = [
        ...todoData.slice(0, idx), 
        newItem,
        ...todoData.slice(idx+1)
      ]; 

      return {
        todoData: newTodoData
      } 
    });
  }

  render() {
    const todoData = this.state.todoData;
    const doneCount = todoData.filter((item)=> item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount}/>
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>
          <TodoList 
            todos={ todoData } 
            onDeleted={ (id) => this.deleteItem( id) }
            onToggleImportant={ (id) => this.onToggleImportant( id) }
            onToggleDone={ (id) => this.onToggleDone( id) }
          />
          <ItemAddFrom 
            onAddItem={ (item) => this.addItem(item) }
          />
      </div>
      );
  }
}