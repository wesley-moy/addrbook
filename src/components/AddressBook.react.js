'use strict';

import React from 'react';
import $ from 'jquery';
import { Router, Route, Link } from 'react-router';
import Button from './Button.react';
/**
 * Address book class.
 */
export default class AddressBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      curFirstName: this.props.firstName, //having these 4 fields necessary to keep update?
      curLastName: this.props.lastName,
      curEmail: this.props.email,
      contacts: []
    };
    this.handleFName = this.handleFName.bind(this); // look over when need to bind and not bind
    this.handleLName = this.handleLName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.addContact = this.addContact.bind(this);
    this.delContact = this.delContact.bind(this);
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
      // value: event.target.value,
      curFirstName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the last name passed in to the input box.
   * @param  event object
   */
  handleLName(event) {
    this.setState({
      // value: event.target.value,
      curLastName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the email passed in to the input box.
   * @param  event object
   */
  handleEmail(event) {
    this.setState({
      // value: event.target.value,
      curEmail: event.target.value
    });
  }

  /**
   * Onclick function to handle updating new contact to address book.
   * @param event object
   * @return On success, adds contact to contacts. On fail, prints error message to console.
   */
  submitClick(e) {
    e.preventDefault();
    if(this.isFormFilled()) {
      var newContact = {
          firstName: this.state.curFirstName,
          lastName: this.state.curLastName,
          email: this.state.curEmail  //i pass in newcontact info, server suppose to tag with id?
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
        console.log('put was performed.');
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
   * Onclick function to show all the contacts.
   * @return {[type]} [description]
   */
  viewClick(e) {
    // want to add it to a new route to display contacts
    e.preventDefault();
    console.log('viewClick');
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

  editClick(e) {
    // need to handle once clicked then give it screen to edit and save
    e.preventDefault();
    console.log('edit click triggered');
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

  /**
   * Preliminary getting contacts to display on UI.
   */
  componentDidMount() {
    this.getContacts();
  }

  /**
   * Render the HTML onto the web UI.
   */
  render() {
    var delContact = this.delContact; //can use arrow notation too to bind 
    var editClick = this.editClick;
    return (
      <div>
        <h1>{this.props.message}</h1>
        <h2>{this.props.description}</h2>
        <form>
            <p> <input type='text' name={this.props.firstName} placeholder={this.props.firstName} onChange={this.handleFName}/>
            Must include first name. </p>
            <p> <input type='text' name={this.props.lastName} placeholder={this.props.lastName} onChange={this.handleLName}/>
            Must include last name. </p>
            <p> <input type='email' name={this.props.email} placeholder={this.props.email} onChange={this.handleEmail}/>
            Must include a valid email. </p>
            <button type = 'submit' onClick={this.submitClick}> Submit </button>
            <br/>
            <Button buttonName='Add Contact' onClick={this.viewClick}> </Button>
        </form>
      </div>
    );
  }

//{this.state.value}

}

// issue of make mistake spelling then go fix it and press submit again, it won't update
// error cases not working properly

// 1. The initial page should be a directory page listing all of the contacts that have been added the directory.
// 4. If you click on the name of the contact, it should take you to a page to edit the contact.
// 5. A button below the list of contacts should take you to a page to create new contacts.
// 6. On the create a contact page, it should have an input for: First Name, Last Name, and Email.
// 7. Each input requires an input, and additionally, the email should follow a valid email format.

export default AddressBook;
