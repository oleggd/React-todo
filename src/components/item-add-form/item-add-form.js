import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddFrom extends Component {
  
  render() {
    const { onAddItem } = this.props;

    return(
      <div className="item-add-form">
        <button 
          className="btn btn-outline-secondary"
          onClick={()=> onAddItem('Add Item') }
        >Add Item</button>
      </div>
    )
  }
}