'use strict';

import React, { Component } from 'react';
import $ from 'jquery';
import ContactItem from './ContactItem.react';
import Button from './Button.react';
import { Link } from 'react-router';

export default class ContactList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
  }

  handleRemove = (event: any) => {
    $.ajax({
      url: '/api/contacts/' + event.target.id,
      type: 'DELETE',
      dataType: 'json',
      success: (response) => {
        console.log('we just deleted a contact :(');
        this.getContactList();
      },
      error: (xhr, status, error) => {
        console.log(xhr);
      }
    });
  }

  getContactList() {
    $.ajax({
      url: '/api/contacts/',
      type: 'GET',
      dataType: 'json',
      success: (response) => {
        this.setState({
          contacts: response
        });
      },
      error: (xhr, status, error) => {
        console.log(xhr);
      }
    });
  }

  componentWillMount() {
    this.getContactList();
  }

  render() {
    let rows = [];
    this.state.contacts.forEach((contact) => {
        rows.push(
          <ContactItem
            key={contact.id}
            contact={contact}
            firstName={contact.firstName}
            lastName={contact.lastName}
            email={contact.email}
            handleRemove={this.handleRemove}
          />
        );
      },
    );

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
