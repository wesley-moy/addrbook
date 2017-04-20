import React, { Component } from 'react';
import Button from './Button.react';
import $ from 'jquery';


type State = {
  contact: Object,
  firstName: string,
  lastName: string,
  email: string,
};

export default class UpdateContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: {id: this.props.params.id},
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  getContact(id) {
    $.ajax({
      url: '/api/contacts/' + id,
      type: 'GET',
      dataType: 'json',
      success: (response) => {
        if (response.id == id) {
            let contact = {};
            contact.id = id;
            contact.firstName = response.firstName;
            contact.lastName = response.lastName;
            contact.email = response.email;
            this.setState({
              contact: contact,
              firstName: contact.firstName,
              lastName: contact.lastName,
              email: contact.email,
            });
        }
        console.log(response);
      },
      error: (xhr, status, error) => {
        console.log(xhr);
      }
    });
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
      contact.id = this.state.contact.id;
      contact.firstName = this.state.firstName;
      contact.lastName = this.state.lastName;
      contact.email = this.state.email;

      this.setState({
        firstName: '',
        lastName: '',
        email: '',
      });
      this.updateContact(contact);
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

  updateContact(contact) {
    $.ajax({
      url:'/api/contacts/',
      type: 'PUT',
      dataType: 'json',
      data: {id: contact.id, contact: contact},
      success: function(data) {
        console.log(data);
        console.log('We updated a contact! \o/');
      },
      error: function(error) {
        console.log(error);
      }
    });
  }

  componentWillMount() {
    this.getContact(this.state.contact.id);
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
