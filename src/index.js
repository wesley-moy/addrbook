'use strict';
import React from 'react';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import ReactDOM from 'react-dom';
import App from './components/App.react';
import Root from './components/Root.react';
import ContactList from './components/ContactList.react'
import AddContactForm from './components/AddContactForm.react'
import UpdateContactForm from './components/UpdateContactForm.react';
import {Router, Route, IndexRoute, applyRouterMiddleware} from 'react-router';

import './styles/styles.css';

const ViewerQueries = {
  viewer: () => Relay.QL`query { contacts }`
};

const routes = (
  <Router render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route path='/' component={Root}>
      <IndexRoute component={App} queries={ViewerQueries} />
      <Route path='listContact' component={App} queries={ViewerQueries} />
      <Route path='addContact' component={AddContactForm} queries={ViewerQueries} />
      <Route path='updateContact/:id' component={UpdateContactForm} queries={ViewerQueries} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('mount'));
