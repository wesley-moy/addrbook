import Relay from 'react-relay';
import React, { Component } from 'react';
import Button from './Button.react';
import ContactList from './ContactList.react';
import ContactItem from './ContactItem.react';
import UpdateContactMutation from '../mutations/UpdateContactMutation';

type State = {
  contact: Object,
  firstName: string,
  lastName: string,
  email: string,
};

class UpdateContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.viewer.id,
      firstName: this.props.viewer.firstName,
      lastName: this.props.viewer.lastName,
      email: this.props.viewer.email,
    };
  }

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.isValidData()) {
      this.updateContact();
      this.setState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
      });
    }
  }

  isValidData() {
    if (this.state.firstName.length === 0) {
      return false;
    }
    if (this.state.lastName.length === 0) {
      return false;
    }
    if (this.state.email.length === 0) {
      return false;
    }
    return true;
  }

  updateContact() {
    Relay.Store.commitUpdate(
      new UpdateContactMutation({
        viewer: this.props.viewer,  // pass prop viewer for fragment to work
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      }),
    );
  }

  render() {

    return(
      <div className='contact-form-component'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.firstName}
            name='firstName'
            onChange={this.handleChange}
            placeholder='First Name'
          />
          <input
            type='text'
            value={this.state.lastName}
            name='lastName'
            onChange={this.handleChange}
            placeholder='Last Name'
          />
          <input
            type='email'
            value={this.state.email}
            name='email'
            onChange={this.handleChange}
            placeholder='email@mail.com'
          />
          <div className="form-controls">
            <Button linkTo="listContact" label="&#x21A9;" />
            <button type='submit' onClick={this.handleSubmit}>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Relay.createContainer(UpdateContactForm, {
  // initialVariables: {},
  fragments: {
    viewer: () => Relay.QL`
      fragment on Contact {
        id
        firstName
        lastName,
        email
      }
    `,
  },
});
