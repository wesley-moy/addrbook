'use strict';
import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

export default class AddressBook extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderContacts() {
    return(
      this.props.contacts.map(function(contact, key) {
        return(
          <div key={key}>
            {contact.firstName}, {contact.lastName}
          </div>
        )
      })
    );
  }

  render() {
    return (
      <div className="contactsList">
        {this._renderContacts()}
      </div>
    );
  }
}