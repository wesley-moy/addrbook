'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.react';
import ContactList from './components/ContactList.react'
import AddContactForm from './components/AddContactForm.react'
import UpdateContactForm from './components/UpdateContactForm.react';
import {Router, Route, IndexRoute} from 'react-router';

import './styles/styles.css';

const routes = (
  <Router>
    <Route path='/' component={Root}>
      <IndexRoute component={ContactList} />
      <Route path='listContact' component={ContactList} />
      <Route path='addContact' component={AddContactForm} />
      <Route path='updateContact/:id' component={UpdateContactForm} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('mount'));
