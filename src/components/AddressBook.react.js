'use strict';

import React from 'react';
import $ from 'jquery';
import {Button} from 'react-bootstrap';

/**
 * Address book class.
 */
class AddressBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      curFirstName: this.props.firstName, //having these 3 fields necessary to keep update?
      curLastName: this.props.lastName,
      curEmail: this.props.email,
      contacts: []
    };
    this.handleFName = this.handleFName.bind(this);
    this.handleLName = this.handleLName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  // must be a better way of handling instead of handling them all separate
  // such as some generic function that takes in thing we want to change
  // along with the event

  /**
   * Update the state of event to contain the first name passed in to the input box.
   * @param  {String} first name user typed in
   */
  handleFName(event) {
    this.setState({
      value: event.target.value,
      curFirstName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the last name passed in to the input box.
   * @param  {String} last name input user typed in
   */
  handleLName(event) {
    this.setState({
      value: event.target.value,
      curLastName: event.target.value
    });
  }

  /**
   * Update the state of event to contain the email passed in to the input box.
   * @param  {String} email user typed in
   */
  handleEmail(event) {
    this.setState({
      value: event.target.value,
      curEmail: event.target.value
    });
  }

  /**
   * Onclick function to handle updating new contact to address book.
   * @return On success, adds contact to contacts. On fail, prints error message to console.
   */
  submitClick() {
    if(this.isFormFilled()) {
      var newContact = {
          firstName: this.state.curFirstName,
          lastName: this.state.curLastName,
          email: this.state.curEmail,
          id: 0 //dummy for now, ask Wesley why wanted id? and how to autoincrement it
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
    if (this.state.email === 'email') // make sure follows correct regex
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
   * Sends DELETE request to remove contact from the server.
   */
  // maybe want to pass in contact? or else how know?
  // removeContact() {
  //   $.ajax({
  //     url: '/api/contacts',
  //     type: 'DELETE',
  //     dataType: 'json',
  //     success: function(data) {
  //       console.log('put was performed.');
  //     }
  //   });
  //   this.getContacts();
  // }

  /**
   * Onclick function to show all the contacts.
   * @return {[type]} [description]
   */
  viewClick() {
    // want to add it to a new route to display contacts
    //$.children('.entries').css('visibility', 'hidden');
    console.log('viewClick');
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
    return (
      <div>
        <h1>{this.props.message}</h1>
        <h2>{this.props.description}</h2>
        <form>
            <p> <input type='text' name = {this.props.firstName} placeholder = {this.props.firstName} onChange={this.handleFName}/>
            Must include first name. </p>
            <p> <input type='text' name ={this.props.lastName} placeholder = {this.props.lastName} onChange={this.handleLName}/>
            Must include last name. </p>
            <p> <input type='email' name ={this.props.email} placeholder = {this.props.email} onChange={this.handleEmail}/>
            Must include a valid email. </p>
            <Button onClick = {this.submitClick}> Submit </Button>
            <br/>
            <Button onClick={this.viewClick}> View Directory </Button>
            <div className = 'entries'>
              {
                this.state.contacts.map(function(contact, index) {
                  return (
                    <span>
                      <div key={index}>{contact.firstName} {contact.lastName} {contact.email}</div>
                      <button> Delete </button>
                    </span>
                    );
                })
              }
            </div>
        </form>
      </div>
    );
  }
//style={{visibility: 'hidden'}} for the entries div then want it to show on click for directory
//{this.state.value}

}

export default AddressBook;
