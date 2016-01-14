'use strict';

import React from 'react';

class AddressBook extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.message}</h1>
        <h2>{this.props.description}</h2>
      </div>
    );
  }
}

export default AddressBook;