'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook.react';

var message = 'AddressBook';
var d = 'A fun place to store your contacts.';
var firstName = 'First Name';
var lastName = 'Last Name';
var email = 'Email';
var val = 'initial';
ReactDOM.render(<AddressBook message={message} description={d} firstName={firstName} 
  lastName = {lastName} email = {email} />, document.getElementById('mount'));
