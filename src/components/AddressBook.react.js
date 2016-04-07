  'use strict';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { _deleteContacts } from '../actions/contacts.actions.js';
import AddContacts from './AddContacts.react';


export default class AddressBook extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderContacts() {
    var temp = this;
    return(
      this.props.contacts.map(function(contact, key) {
        return(
          <div key={key}>
            <button onClick={temp.props._deleteContacts.bind(null, contact.id)}>Delete</button>
            <Link to={`/EditContacts/${contact.id}/`}>{contact.firstName}, {contact.lastName}</Link>
          </div>
        )
      })
    );
  }

  render() {
    return(
      <div>
        {this._renderContacts()}
        <hr />
        <button>
          <Link to="/AddContacts/">Add Contacts</Link> <br />
        </button>
      </div>
    );
  }
}

export default connect(null, {_deleteContacts})(AddressBook);
