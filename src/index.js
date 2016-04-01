import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import Routes from './routes';
import Reducers from './reducers/root.reducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

render(
	<Provider store={createStoreWithMiddleware(Reducers)}>
		<Router history={browserHistory} routes={Routes} />
	</Provider>,
	document.getElementById('mount'));