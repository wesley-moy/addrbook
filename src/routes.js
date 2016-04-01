import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.react';
import Main from './components/main.react';
import AddressBook from './components/AddressBook.react';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
  </Route>
);