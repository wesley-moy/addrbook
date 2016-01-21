'use strict';

import React, { Component } from 'react';

/**
 * Root Component.
 */
export default class Root extends Component {

  /**
   * Renders component
   * @return {ReactElement} Markup for component
   */
  render() {
    return (
      <div>
        <h1> AddressBook </h1>
        <h2>A fun place to store your contacts!</h2>
        {this.props.children}
      </div>
    );
  }
}
