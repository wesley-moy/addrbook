import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.react';
import Main from './components/main.react';
import AddressBook from './components/AddressBook.react';
import AddContacts from './components/AddContacts.react';
import EditContacts from './components/EditContacts.react';


export default (
  <Route path="/" component={App}>
	<IndexRoute component={Main} />
	<Route path='/AddContacts' component={AddContacts} />
	<Route path='/EditContacts/:id' component={EditContacts} />
  </Route>
);
