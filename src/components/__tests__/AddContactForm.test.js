import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddContactForm from '../AddContactForm.react.js';

describe('AddContactForm Component', () => {
  let contactForm;
  let event;
  let contact = {};

  const saveContact = jest.fn();

  describe('Render Tests', () => {
    beforeEach(() => {
      contactForm = shallow(<AddContactForm />);
    });

    it('Renders correctly', () => {
      expect(shallowToJson(contactForm)).toMatchSnapshot();
    });

  });

  describe('Unit test: handleChange firstName', () => {
    beforeEach(() => {
        event = {
          target: {
            name: 'firstName',
            value: 'testValue',
          },
        };
    });

    it('handles firstName change', () => {
      expect(contactForm.instance().state.firstName).toBe('');
      contactForm.instance().handleChange(event);
      expect(contactForm.instance().state.firstName).toBe('testValue');
    });
  });

  describe('Unit test: handleChange lastName', () => {
    beforeEach(() => {
        event = {
          target: {
            name: 'lastName',
            value: 'testValue',
          },
        };
    });

    it('handles lastName change', () => {
      expect(contactForm.instance().state.lastName).toBe('');
      contactForm.instance().handleChange(event);
      expect(contactForm.instance().state.lastName).toBe('testValue');
    });
  });

  describe('Unit test: handleChange email', () => {
    beforeEach(() => {
        event = {
          target: {
            name: 'email',
            value: 'testValue',
          },
        };
    });

    it('handles email change', () => {
      expect(contactForm.instance().state.email).toBe('');
      contactForm.instance().handleChange(event);
      expect(contactForm.instance().state.email).toBe('testValue');
    });
  });

  describe('Unit test: handleSubmit', () => {
    beforeEach(() => {
        event = {
          preventDefault: () => {},
        };
        contact = {
          firstName: 'firstname',
          lastName: 'lastname',
          email: 'email',
        };
      });

    it('calls saveContact with invalid data', () => {
      const saveContact = jest.spyOn(contactForm.instance(), 'saveContact');
      contactForm.instance().state.firstName = '';
      contactForm.instance().state.lastName = '';
      contactForm.instance().state.email = '';
      contactForm.instance().handleSubmit(event);
      expect(saveContact).not.toHaveBeenCalled();
    });

    it('calls saveContact with valid data', () => {
      const saveContact = jest.spyOn(contactForm.instance(), 'saveContact');
      contactForm.instance().state.firstName = 'firstname';
      contactForm.instance().state.lastName = 'lastname';
      contactForm.instance().state.email = 'email';
      contactForm.instance().handleSubmit(event);
      expect(saveContact).toHaveBeenCalledWith(contact);
      expect(contactForm.instance().state.firstName).toBe('');
      expect(contactForm.instance().state.lastName).toBe('');
      expect(contactForm.instance().state.email).toBe('');
    });

  });


});
