import axios from 'axios';
import _ from 'lodash';

export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';

export function _addContacts(firstname, lastname, email) {
	const request = axios.post("api/contacts", {
		firstName: firstname,
		lastName: lastname,
		email: email
	});
	return {
		type: ADD_CONTACT,
		payload: request
	};
}

export function _fetchContacts() {
	const contacts = axios.get("api/contacts", {});
	return {
		type: FETCH_CONTACTS,
		payload: contacts
	};
}


