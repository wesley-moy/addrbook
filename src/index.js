'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.react';
import {Router, Route, IndexRoute} from 'react-router';

const routes = (
  <Router>
    <Route path='/' component={Root}>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('mount'));
