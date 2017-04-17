'use strict';

import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

export default class AddressBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	contacts: []
    }
    this._deleteContacts = this._deleteContacts.bind(this);
  }

  componentDidMount() {
  	$.ajax({
  		url: "api/contacts/",
  		type: "GET",
  		success: function(res){
  			this.setState({
  				contacts: res
  			});
  		}.bind(this),
  		error: function(xhr, status, error){
  			console.log(status);
  		}
  	});
  }

  _deleteContacts(id, e) {
    $.ajax({
      url: "api/contacts/" + id,
      type: "DELETE",
      success: (res) => {
        this.setState({
          contacts: res
        })
      },
      error: (xhr, status, error) => {
        console.log(status);
      }
    });
  }

  _renderContacts() {
    var temp = this;
    return(
      this.state.contacts.map(function(contact, key) {
        return(
          <div key={key}>
            <button onClick={temp._deleteContacts.bind(null, contact.id)}>Delete</button>
            <Link to={"/EditContacts/" + contact.id}>{contact.firstName}, {contact.lastName}</Link>
          </div>
        )
      })
    );
  }

  render() {
    return(
      <div>
        These are my Contacts <br />
        {
          this._renderContacts()
        }
        <hr />
        <button>
          <Link to="AddContacts">Add Contacts</Link> <br />
        </button>
      </div>
    );
  }
}
