
import React, { Component } from 'react';
import Button from './Button.react';
import $ from 'jquery';

type Props = {
  contact: Object,
  firstName: string,
  lastName: string,
  email: string,
  handleRemove: ?Function,
};

export default class ContactItem extends Component {

  props: Props;

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
      contact,
      firstName,
      lastName,
      email,
    } = this.props;

    return(
      <div className="contact-item-component">
        <div className="contact-buttons">
          {this.props.handleRemove ?
            <button id={contact.id} onClick={this.props.handleRemove}>&#x2716;</button>
            : ''}
          <Button linkTo={'updateContact/' + contact.id} label='&#9998;' />
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
