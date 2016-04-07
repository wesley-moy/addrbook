import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> AddressBook </h1>
        {this.props.children}
      </div>
    );  
  }
}