import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { _addContacts } from '../actions/contacts.actions';
import AddressBook from './AddressBook.react';
import RootReducer from '../reducers/root.reducer';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AddressBook contacts={this.props.contacts} />
      </div>
    );  
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts.contacts,
    primaryContact: state.contacts.primaryContact
  }
}

export default connect(mapStateToProps, {_addContacts})(Main);
