'use strict';

require('./css/Button.less');

import React from 'react';
import {Link} from 'react-router';

/**
 * Styled button component. 
 */
export default class Button extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5> This is my button component. </h5>
        <button>
          <Link to={this.props.linkName}>{this.props.buttonName}</Link> 
        </button>
      </div>
    );
  }
}
