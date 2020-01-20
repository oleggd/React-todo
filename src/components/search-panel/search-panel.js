import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  
  state = {
    label: ''
  }

  onSearchChange = (event) => {
    const label = event.target.value;
    this.setState({ label });
    
    this.props.onSearchItem(label);
  }

  render() {
    const searchText = "Type here to search";

    return <input type="text"
              placeholder={searchText}
              className="form-control search-input"
              onChange={this.onSearchChange}
              value={ this.state.label }
            />;
  }



  
}
