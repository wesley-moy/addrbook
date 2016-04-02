import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { _fetchContacts, _addContacts } from '../actions/contacts.actions';
import AddressBook from './AddressBook.react';
import RootReducer from '../reducers/root.reducer';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props._addContacts('John','Daniel','email@email.com');
  }

  render() {
    return (
      <div>
        <h1> AddressBook </h1>
        <AddressBook contacts={this.props.contacts} />
      </div>
    );  
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts.contacts
  }
}

export default connect(mapStateToProps, {_fetchContacts,_addContacts})(Main);