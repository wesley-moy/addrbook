'use strict';
import Relay from 'react-relay';
import React, { Component } from 'react';
import $ from 'jquery';
import ContactItem from './ContactItem.react';
import Button from './Button.react';
import { Link } from 'react-router';

class ContactList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
  }

  handleRemove = (event: any) => {
  }

  getContactList() {
  }

  componentWillMount() {
    // this.getContactList();
  }

  render() {
    let rows = [];

    this.props.contacts.edges.map((edge, index) => {
      rows.push(
        <ContactItem
          key={edge.node.id}
          contact={edge.node}
          handleRemove={this.handleRemove}
        />
      );
    });

    return(
      <div className='contact-list-component'>
        <div className='contact-list-button-div'>
          <Button linkTo='addContact' label='Add Contact' />
        </div>
        <div>{rows}</div>
      </div>
    );
  }
}

export default Relay.createContainer(ContactList, {
  // initialVariables: {},
  fragments: {
    contacts: () => Relay.QL`
      fragment on ContactConnection {
        edges {
          node {
            id
            ${ContactItem.getFragment('contact')}
          }
        }
      }
    `,
  },
});
