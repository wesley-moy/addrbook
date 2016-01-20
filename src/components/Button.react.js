'use strict';

require('./css/Button.less');

import React from 'react';
import $ from 'jquery';
import AddrBook from './AddressBook.react';

/**
 * Styled Button component. 
 */
export default class Button extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p> This is my button component. </p>
        <button> {this.props.buttonName} </button>
      </div>
    );
  }
}
// less is preprocessed
// look up less sass
