'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook.react';
import AddContactPanel from './components/AddContactPanel.react';
import EditContactPanel from './components/EditContactPanel.react';
import Root from './components/Root.react';
import { Router, Route, Link, DefaultRoute } from 'react-router';

var message = 'AddressBook';
var d = 'A fun place to store your contacts.';
var firstName = 'First Name';
var lastName = 'Last Name';
var email = 'Email';
var val = 'initial';

const routes = (
  <Route component={Root}>
    <Route path='addcontactpanel' component={AddContactPanel} />
    <Route path='editcontactpanel' component={EditContactPanel} />
    <Route path='addressbook' component={AddressBook} />
    <Route path="/" component={AddressBook} />
  </Route>
);

ReactDOM.render(<Router routes={routes} message={message} description={d} firstName={firstName}
  lastName = {lastName} email = {email} />, document.getElementById('mount'));
