'use strict';

import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';


export default class AddContacts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this._addContact = this._addContact.bind(this);
    this._updateFirstName = this._updateFirstName.bind(this);
    this._updateLastName = this._updateLastName.bind(this);
    this._updateEmail = this._updateEmail.bind(this);
  }

  _updateFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  _updateLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  _updateEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  _addContact(e) {
    if(!this.state.firstName || !this.state.lastName || !this.state.email){
      return;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.state.email)){
      return;
    }
      $.ajax({
      url: "api/contacts/",
      type: "POST",
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      },
      success: function(res){
        console.log(res);
      }.bind(this),
      error: function(xhr, status, error){
        console.log(status);
      }
    });
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="First Name" onChange={this._updateFirstName} /> First Name <br />
        <input type="text" placeholder="Last Name" onChange={this._updateLastName} /> Last Name <br />
        <input type="text" placeholder="Email" onChange={this._updateEmail} /> Email <br />

        <button onClick={this._addContact}>Add Contact</button> <br />
        <hr />
        <button>
          <Link to="AddressBook">Address Book</Link>
        </button>
      </div>
    );
  }
}