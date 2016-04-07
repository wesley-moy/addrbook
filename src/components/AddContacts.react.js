'use strict';

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { _addContacts } from '../actions/contacts.actions';
import { connect } from 'react-redux';


export default class AddContacts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
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
    this.props._addContacts(this.state.firstName, this.state.lastName, this.state.email);
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
          <Link to="/">Address Book</Link>
        </button>
      </div>
    );
  }
}

export default connect(null, {_addContacts})(AddContacts);
