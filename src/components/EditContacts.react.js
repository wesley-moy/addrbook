'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { _editContacts, _updateContacts } from '../actions/contacts.actions.js';

export default class EditContacts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this._updateFirstName = this._updateFirstName.bind(this);
    this._updateLastName = this._updateLastName.bind(this);
    this._updateEmail = this._updateEmail.bind(this);
    this._updateContact = this._updateContact.bind(this);
  }

  componentWillMount() {
    this.props._editContacts(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.primaryContact.firstName,
      lastName: nextProps.primaryContact.lastName,
      email: nextProps.primaryContact.email
    });
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

  _updateContact(e) {
    console.log(this);
    // if(!this.state.firstName || !this.state.lastName || !this.state.email){
    //   return;
    // }
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if(!re.test(this.state.email)){
    //   return;
    // }
    this.props._updateContacts(this.state.firstName, this.state.lastName, this.state.email, this.props.params.id);
  }

  render() {
    return(
      <div>
        Edit Contacts <br />
        <input type="text" placeholder="First Name" onChange={this._updateFirstName} value={this.state.firstName} /> First Name <br />
        <input type="text" placeholder="Last Name" onChange={this._updateLastName} value={this.state.lastName} /> Last Name <br />
        <input type="text" placeholder="Email" onChange={this._updateEmail} value={this.state.email} /> Email <br />
        <button onClick={this._updateContact.bind()}>Update Contact</button>
        <hr />
        <Link to="/">Address Book</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    primaryContact: state.contacts.primaryContact
  }
}

export default connect(mapStateToProps, {_editContacts, _updateContacts})(EditContacts);
