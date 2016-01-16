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
      curFirstName: this.props.firstName,
      curLastName: this.props.lastName,
      curEmail: this.props.email,
      contacts: []
    };
    this.handleFName = this.handleFName.bind(this);
    this.handleLName = this.handleLName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.isFormFilled = this.isFormFilled.bind(this); // dont think i need this one
    this.addContact = this.addContact.bind(this);
  } 

  handleFName(event) {
    this.setState({
      value: event.target.value,
      curFirstName: event.target.value
    });
  }

  handleLName(event) {
    this.setState({
      value: event.target.value,
      curLastName: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      value: event.target.value,
      curEmail: event.target.value
    });
  }

  buttonClick() {
    // if(isFormFilled() == true) {
    var newContact = {
        firstName: this.state.curFirstName,
        lastName: this.state.curLastName,
        email: this.state.curEmail,
        id: 0
      };
    console.log('first name is ' + newContact['firstName']);
    this.addContact(newContact);
    // } else {
    //   console.log('form not filled');
    // }
    this.getContacts();
  }

  isFormFilled() {
    if(curFirstName === 'First Name')
      return false;
    if (curLastName === 'Last Name')
      return false;
    if (curEmail === 'Email')
      return false;
    return true;
  }

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
  }

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

  componentDidMount() {
    // var newContact = {
    //   firstName: 'viet',
    //   lastName: 'myman',
    //   email: 'yo@aol.com',
    //   id: 3
    // };
    // this.addContact(newContact);
    this.getContacts();
  }

  render() {
    return (
      <div>
        <h1>{this.props.message}</h1>
        <h2>{this.props.description}</h2>
        {this.state.value}
        {
          this.state.contacts.map(function(contact, index) {
            return <div key={index}>{contact.firstName}</div>;
          })
        }
        <form>
            <p> <input type='text' name = {this.props.firstName} placeholder = {this.props.firstName} onChange={this.handleFName}/>
            Must include first name. </p>
            <p> <input type='text' name ={this.props.lastName} placeholder = {this.props.lastName} onChange={this.handleLName}/>
            Must include last name. </p>
            <p> <input type='text' name ={this.props.email} placeholder = {this.props.email} onChange={this.handleEmail}/>
            Must include a valid email. </p>
            <Button onClick= {this.buttonClick}> Submit </Button>
            <br/>
            <Button> View Directory </Button>
        </form>
      </div>
    );
  }

  // to update state
  // something -> list
  /**  render() {
    return (
      <div>
        <h1>{this.props.message}</h1>
        <h2>{this.props.description}</h2>
        {this.state.value}
        {
          this.state.contacts.map(function(contact, index) {
            return <div key={index}>{contact.firstName}</div>;
          })
        }
        <form>
            <input type='text' name='fullname' value={this.state.value} onChange={this.handleChange}/>
            {this.props.phone_number}
            <input type='text' name='number'/>
            <Button>Save</Button>
        </form>
      </div>
    );
  } */

}

export default AddressBook;
