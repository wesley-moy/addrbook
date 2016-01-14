'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './components/AddressBook.react';

var message = 'Hello';
var d = 'description';
ReactDOM.render(<AddressBook message={message}  description={d} />, document.getElementById('mount'));