'use strict';

import React from 'react';
import $ from 'jquery';
import Button from './Button.react';

/**
 * Styled Button component. 
 */
export default class EditContactPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      firstName: '',
      lastName: '', 
      email: ''
    }
    this.handleFName = this.handleFName.bind(this);
    this.handleLName = this.handleLName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.getContact = this.getContact.bind(this);
    this.updatedContact = this.updatedContact.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  /**
   * Update the state of event to contain the first name passed in to the input box.
   * @param  event object
   */
  handleFName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the last name passed in to the input box.
   * @param  event object
   */
  handleLName(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the email passed in to the input box.
   * @param  event object
   */
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  /**
   * PUT request with updated characteristics of contact.
   * @param  {Object} e event
   */
  editContact(e) {
    e.preventDefault();
    var updates = this.updatedContact();
    $.ajax({
      url: '/api/contacts/',
      type: 'PUT',
      dataType: 'json',
      data: updates,
      success: (data) => {
        console.log('update was performed.');
      },
      error: (xhr, status, error) => {
        console.log(xhr);
      }
    });
  }

  /**
   * Checks for which fields changed, and creates a new contact object with same id, along
   * with changed fields.
   * @return {Contact Object} Updated Contact. 
   */
  updatedContact() {
    var upContact = {
      id: this.props.params.id,
      contact: {}
    };
    if (this.state.firstName != '') {
      upContact.contact.firstName = this.state.firstName;
    }
    if (this.state.lastName != '') {
      upContact.contact.lastName = this.state.lastName;
    }
    if (this.state.email != '') {
      upContact.contact.email = this.state.email;
    }

    return upContact;
  }

  /**
   * Grabs the specific contact from the given id (this.props.params.id). Sets it to 
   * this.state.contact
   */
  getContact() {
    $.ajax({
      url: '/api/contacts/' + this.props.params.id,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        this.setState({
          contact: res
        });
        console.log('get was performed for id: ' + this.state.contact.id);
      },
      error: (xhr, status, error) => {
        console.log(xhr);
      }
    });
  }

  componentDidMount() {
    var id = this.props.params.id;
    this.getContact(id);
  }

  render() {
    return (
      <div>
        <p> This is my edit contact component. </p>
        <form>
            <p> <input type='text' placeholder={this.state.contact.firstName || ''} onChange={this.handleFName}/>
            Change first name. </p>
            <p> <input type='text' placeholder={this.state.contact.lastName || ''} onChange={this.handleLName}/>
            Change last name. </p>
            <p> <input type='text' placeholder={this.state.contact.email || ''} onChange={this.handleEmail}/>
            Change email. </p>
            <button type = 'submit' onClick={this.editContact} > Update Contact </button>
            <Button linkName='addressbook' buttonName='Return to Contacts' />
        </form>      
      </div>
    );
  }
}
