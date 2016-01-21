'use strict';

import React from 'react';
import $ from 'jquery';
import Button from './Button.react';
import Contact from './Contact.react';

/**
 * Styled Button component. 
 */
export default class AddressBook extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
    this.getContacts = this.getContacts.bind(this);
    this.delContact = this.delContact.bind(this);
  }

  /**
   * Sends DELETE request to remove contact from the server.
   */
  delContact(id, e) {
    e.preventDefault();
    $.ajax({
      url: '/api/contacts/' + id,
      type: 'DELETE',
      dataType: 'json',
      success: (data) => {
        console.log('delete was performed.' + id);
      },
      error: (xhr, status, error) => {
        console.log(xhr);
      }
    });
    this.getContacts();
  }

  /**
   * Grabs the contacts from the server, and saves it to contacts in state object.
   */
  getContacts() {
    $.ajax({
      url: '/api/contacts',
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        this.setState({
          contacts: res
        });
      }
    });
  }

  /**
   * Preliminary getting contacts to display on UI.
   * Note to self: this happens before render, and only once its run
   */
  componentDidMount() {
    this.getContacts();
  }

  render() {
    var delContact = this.delContact; //can use arrow notation too to bind 
    return (
      <div>
        <h4> My Contacts: </h4>
        <div className = 'entries'>
          {
            this.state.contacts.map(function (contact, index) {
              return (
                <span key={index}>
                  <Contact contactObj={contact} />
                  <button onClick={delContact.bind(null, contact.id)}> Delete </button>
                </span>
              );
            })
          }
        </div>
        <Button linkName='addcontactpanel' buttonName='Add Contact' />
      </div>
    );
  }
}
