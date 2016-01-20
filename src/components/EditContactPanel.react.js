'use strict';

import React from 'react';
import $ from 'jquery';
import AddrBook from './AddressBook.react';

/**
 * Styled Button component. 
 */
export default class editContactPanel extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p> This is my edit contact component. </p>
      </div>
    );
  }
}
