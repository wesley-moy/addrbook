'use strict';

import React from 'react';
import {Link} from 'react-router';

/**
 * Styled button component. 
 */
export default class Contact extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    var contact = this.props.contactObj;
    return (
      <div>
        <h5> This is my contact component. </h5>
        <Link to={'editcontactpanel/' + contact.id}> {contact.lastName}, {contact.firstName} </Link>
      </div>
    );
  }
}
