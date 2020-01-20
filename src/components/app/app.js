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
    ],
    search: '',
    filter: 'all' // active, all, done
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
      return {
        todoData: newTodoData
      } 
    });
  }

  searchItem = (label) => {
    this.setState({ search: label });
  }

  onFilterChange = (filter) => {
    this.setState({ filter: filter });
  }
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((elm) => elm.id === id );
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
        ...arr.slice(0, idx), 
        newItem,
        ...arr.slice(idx+1)
    ];
  }

  onToggleImportant = (id) => {
    // add element in array
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      } 
    });
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      } 
    });
  }

  search(items, label, type = 'All') {
    const status = type === 'All' ? true : type === 'Active' ? false: true;
    if (label.length === 0) {
      return items;
    }
    return items.filter((item)=> { 
      return item.label.toLowerCase().indexOf(label.toLowerCase()) > -1 && 
        item.done === status
    });
  }

  filter(items, filter) {

    switch(filter) {
      case 'all': 
        return items;
      case 'active': 
        return items.filter((item) => !item.done );
      case 'done': 
        return items.filter((item) => item.done );
      default: return items;
    }
    
  }

  render() {
    const { todoData, search, filter } = this.state;
    const visibleTodoData = this.filter(this.search(todoData,search), filter);
    const doneCount = todoData.filter((item)=> item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount}/>
          <div className="top-panel d-flex">
            <SearchPanel 
              onSearchItem={ (label) => this.searchItem(label) }
            />
            <ItemStatusFilter 
              filter={filter}
              onFilterChange={this.onFilterChange}
            />
          </div>
          <TodoList 
            todos={ visibleTodoData } 
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