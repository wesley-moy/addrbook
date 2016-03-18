'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook.react';
import Root from './components/Root.react';
import {Router, Route, IndexRoute} from 'react-router';

const routes = (
  <Router>
    <Route path='/' component={Root}>
      <IndexRoute component={AddressBook} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('mount'));
