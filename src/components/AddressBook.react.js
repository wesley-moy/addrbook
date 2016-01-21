'use strict';

import React from 'react';
import $ from 'jquery';
import Button from './Button.react';

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
    this.editClick = this.editClick.bind(this);
    this.delContact = this.delContact.bind(this);
  }

  editClick(e) {
    // need to handle once clicked then give it screen to edit and save
    e.preventDefault();
    console.log('edit click triggered');
  }

  /**
   * Sends DELETE request to remove contact from the server.
   */
  delContact(id, e) {
    //call delete
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
   */
  componentDidMount() {
    this.getContacts();
  }



  render() {
    var delContact = this.delContact; //can use arrow notation too to bind 
    var editClick = this.editClick;
    return (
      <div>
        <h4> My Contacts: </h4>
        <div className = 'entries'>
          {
            this.state.contacts.map(function (contact, index) {
              return (
                <span key={index}>
                  <div onClick={editClick.bind(null)}> {contact.lastName}, {contact.firstName} </div>
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


