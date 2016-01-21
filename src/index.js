'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook.react';
import AddContactPanel from './components/AddContactPanel.react';
import EditContactPanel from './components/EditContactPanel.react';
import Root from './components/Root.react';
import {Router, Route, IndexRoute} from 'react-router';

const routes = (
  <Router>
    <Route path='/' component={Root}>
      <IndexRoute component={AddressBook} />
      <Route path='addcontactpanel' component={AddContactPanel} />
      <Route path='editcontactpanel/:id'  component={EditContactPanel} />
      <Route path='addressbook' component={AddressBook} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('mount'));
