import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddFrom extends Component {
  
  state = {
    label: ''
  }

  onLabelChange = (event)=>{
    this.setState({
      label: event.target.value.toUpperCase()
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({label: 'XXX'});
  }

  render() {
    return(
      <form className="item-add-form"
        onSubmit={this.onSubmit}>
        <input type="text" 
              className="form-control"
              onChange={this.onLabelChange}
              placeholder="What we need to be done"
              value={ this.state.label }
        />
        <button  
          className="btn btn-outline-secondary"
        >Add Item</button>
      </form>
    )
  }
}