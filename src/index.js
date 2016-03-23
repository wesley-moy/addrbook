'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook.react';
import AddContacts from './components/AddContacts.react';
import EditContacts from './components/EditContacts.react';
import Root from './components/Root.react';
import {Router, Route, IndexRoute} from 'react-router';

const routes = (
  <Router>
    <Route path='/' component={Root}>
      <IndexRoute component={AddressBook} />
      <Route path='/AddContacts' component={AddContacts} />
      <Route path='/AddressBook' component={AddressBook} />
      <Route path='/EditContacts/:id' component={EditContacts} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('mount'));
