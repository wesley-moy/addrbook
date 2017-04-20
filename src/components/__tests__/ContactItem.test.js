import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ContactItem from '../ContactItem.react.js';

describe('ContactItem Component', () => {
  let contactItem;
  let event;
  let contact = {
    id: 1,
    firstName: 'test',
    lastName: 'testson',
    email: 'test@mail.com',
  };


  const removeContact = jest.fn();

  describe('Render Tests', () => {
    beforeEach(() => {
      contactItem = shallow(<ContactItem
        contact={contact}
        firstName={contact.firstName}
        lastName={contact.lastName}
        email={contact.email}
      />);
      removeContact.mockClear();
    });

    it('Renders correctly', () => {
      expect(shallowToJson(contactItem)).toMatchSnapshot();
    });

  });

  describe('test with undefined handleRemove', () => {
    beforeEach(() => {
      event = {
        preventDefault: () => {},
      };
    });

    it('handles remove without handleRemove prop', () => {
      contactItem.instance().handleRemove(event);
      expect(removeContact).not.toHaveBeenCalled();
    });
  });

  describe('test with defined handleRemove', () => {
    beforeEach(() => {
      contactItem = shallow(<ContactItem
        contact={contact}
        firstName={contact.firstName}
        lastName={contact.lastName}
        email={contact.email}
        handleRemove={removeContact}
      />);
      removeContact.mockClear();
      event = {
          preventDefault: () => {},
      };
    });

    it('handles remove with handleRemove prop', () => {
      contactItem.instance().handleRemove(event);
      expect(removeContact).toHaveBeenCalled();
    });
  });


});
