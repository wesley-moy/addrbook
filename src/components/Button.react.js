'use strict';

require('./css/Button.less');

import React from 'react';
import {Link} from 'react-router';

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
        <button>
          <Link to={this.props.linkName}>{this.props.buttonName}</Link> 
        </button>
      </div>
    );
  }
}
// less is preprocessed
// look up less sass
