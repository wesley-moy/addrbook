'use strict';

import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import Button from './Button.react';

/**
 * Address book class.
 */
export default class AddContactPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curFirstName: 'First Name', //having these 4 fields necessary to keep update?
      curLastName: 'Last Name',
      curEmail: 'Email'
    };
    this.handleFName = this.handleFName.bind(this); // look over when need to bind and not bind
    this.handleLName = this.handleLName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  // must be a better way of handling instead of handling them all separate
  // such as some generic function that takes in thing we want to change
  // along with the event

  /**
   * Update the state of event to contain the first name passed in to the input box.
   * @param  event object
   */
  handleFName(event) {
    this.setState({
      curFirstName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the last name passed in to the input box.
   * @param  event object
   */
  handleLName(event) {
    this.setState({
      curLastName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the email passed in to the input box.
   * @param  event object
   */
  handleEmail(event) {
    this.setState({
      curEmail: event.target.value
    });
  }

  /**
   * Onclick function to handle updating new contact to address book.
   * @param e event object
   * @return On success, adds contact to contacts. On fail, prints error message to console.
   */
  submitClick(e) {
    e.preventDefault();
    if(this.isFormFilled()) {
      var newContact = {
          firstName: this.state.curFirstName,
          lastName: this.state.curLastName,
          email: this.state.curEmail
      };
      this.addContact(newContact);
    } else {
      console.log('form not filled correctly');
      // make something pop up letting user know it errors
    }
  }

  /**
   * Checks to see all input boxes are filled.
   * @return {Boolean} True if all input boxes are filled. False otherwise.
   */
  isFormFilled() {
    if(this.state.curFirstName === 'First Name')
      return false;
    if (this.state.curLastName === 'Last Name')
      return false;
    // if (!this.validateEmail(this.state.email)) {
    //   console.log(this.state.email + 'is not valid');
    //   return false;
    // }
    if (this.state.curEmail === 'Email')
      return false;
    return true;
  }

  /**
   * Makes the POST request to add contact to server.
   * @param Contact object.
   */
  addContact(contact) {
    $.ajax({
      url:'/api/contacts',
      type: 'POST',
      dataType: 'json',
      data: contact,
      success: function(data) {
        console.log('post was performed.');
      }
    });
  }

  /**
   * Validates if passed in string is in correct email format. Found online.
   * @param  {[String]} email User email.
   * @return {[Boolean]} True if follows regex expression.
   */
  validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  render() {
    return (
      <div>
        <form>
            <p> <input type='text' name={this.props.firstName} placeholder={this.props.firstName} onChange={this.handleFName}/>
            Must include first name. </p>
            <p> <input type='text' name={this.props.lastName} placeholder={this.props.lastName} onChange={this.handleLName}/>
            Must include last name. </p>
            <p> <input type='email' name={this.props.email} placeholder={this.props.email} onChange={this.handleEmail}/>
            Must include a valid email. </p>
            <button type = 'submit' onClick={this.submitClick}> Submit </button>
            <Button linkName='addressbook' buttonName='Return to Contacts' />
        </form>
      </div>
    );
  }

}

// issue of make mistake spelling then go fix it and press submit again, it won't update
// error cases not working properly

// 7. Each input requires an input, and additionally, the email should follow a valid email format.

// less is preprocessed
// look up less sass
// a tag refreshes a page, regrabbing and reloading entire file, really wasteful. thats why use link tag
