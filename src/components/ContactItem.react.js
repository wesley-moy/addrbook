import Relay from 'react-relay';
import React, { Component } from 'react';
import Button from './Button.react';
import $ from 'jquery';

type Props = {
  contact: Object,
  handleRemove: ?Function,
};

class ContactItem extends Component {

  props: Props;

  constructor(props) {
    super(props);
  }

  handleRemove = (event: any) => {
    if (this.props.handleRemove) {
      this.props.handleRemove(event);
    }
  }

  handleUpdate = (event: any) => {
    console.log(event.target);
  }

  render() {

    const {
      id,
      firstName,
      lastName,
      email,
    } = this.props.contact;

    return(
      <div className="contact-item-component">
        <div className="contact-buttons">
          {this.props.handleRemove ?
            <button id={id} onClick={this.props.handleRemove}>&#x2716;</button>
            : ''}
          <Button linkTo={'updateContact/' + id} label='&#9998;' />
        </div>
        <div className='contact-name'>
          <span>{lastName}, </span>
          <span>{firstName}</span>
        </div>
        <div className='contact-email'>
          <span>{email}</span>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(ContactItem, {
  fragments: {
    contact: () => Relay.QL`
      fragment on Contact {
        id,
        firstName,
        lastName,
        email,
      },
    `,
  },
});
