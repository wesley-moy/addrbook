'user strict';


import React, { Component } from 'react';
import { Link } from 'react-router';


type Props = {
  linkTo: string,
  label: string,
};

/**
* Button Component
*/
export default class Button extends Component {

  props: Props;

  render() {
    return(
        <Link to={this.props.linkTo}>
          <button>
            {this.props.label}
          </button>
        </Link>
    );
  }
}
