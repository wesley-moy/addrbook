import React, { Component } from 'react';
import Relay from 'react-relay';
import ContactList from './ContactList.react';
import AddContactMutation from '../mutations/AddContactMutation';
import Button from './Button.react';

type Props = {
  handleSubmit: ?Function,
};

type State = {
  firstName: string,
  lastName: string,
  email: string,
};

class AddContactForm extends Component {

  state: State;
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  saveContact() {
    // create an instance of the mutation and queue it on commitUpdate
    Relay.Store.commitUpdate(
      new AddContactMutation({
        viewer: this.props.viewer,  // pass prop viewer for fragment to work
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      }),
    );
  }

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('lets save a contact!');
    if (this.isValidData()) {
      console.log('saving contact!');
      this.saveContact();

      this.setState({
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


export default Relay.createContainer(AddContactForm, {
  // initialVariables: {},
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        contacts(first: 10) {
          ${ContactList.getFragment('contacts')}
        },
      }
    `,
  },
});
