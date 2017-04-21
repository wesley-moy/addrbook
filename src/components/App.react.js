'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import ContactList from './ContactList.react'

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ContactList
         contacts={this.props.viewer.contacts}
      />
    );
  }
}

export default Relay.createContainer(App, {
  // initialVariables: {},
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        contacts(first: 10) {
          ${ContactList.getFragment('contacts')}
        },
      }
    `,
  },
});
