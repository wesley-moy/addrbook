import React, { Component } from 'react';
import Button from './Button.react';
import $ from 'jquery';

type State = {
  firstName: string,
  lastName: string,
  email: string,
};

export default class AddContactForm extends Component {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.isValidData()) {
      let contact = {};
      contact.firstName = this.state.firstName;
      contact.lastName = this.state.lastName;
      contact.email = this.state.email;

      this.setState({
        firstName: '',
        lastName: '',
        email: '',
      });
      this.saveContact(contact);
    }
  }

  isValidData() {
    if (this.state.firstName.length === 0) {
      return false;
    }
    if (this.state.lastName.length === 0) {
      return false;
    }
    if (this.state.email.length === 0) {
      return false;
    }
    return true;
  }

  saveContact(contact) {
    $.ajax({
      url:'/api/contacts',
      type: 'POST',
      dataType: 'json',
      data: contact,
      success: function(data) {

        console.log('We saved a contact! \o/');
      },
      error: function(error) {
        // console.log(error);
      }
    });
  }

  render() {
    return(
      <div className='contact-form-component'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.firstName}
            name='firstName'
            onChange={this.handleChange}
            placeholder='First Name'
          />
          <input
            type='text'
            value={this.state.lastName}
            name='lastName'
            onChange={this.handleChange}
            placeholder='Last Name'
          />
          <input
            type='email'
            value={this.state.email}
            name='email'
            onChange={this.handleChange}
            placeholder='email@mail.com'
          />
          <div className="form-controls">
            <Button linkTo="listContact" label="&#x21A9;" />
            <button type='submit' onClick={this.handleSubmit}>Save</button>
          </div>
        </form>
      </div>
    );
  }
}
