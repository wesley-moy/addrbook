import axios from 'axios';
import _ from 'lodash';

export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const FETCH_CONTACT = 'FETCH_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

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

export function _deleteContacts(id) {
	const request = axios.delete(`api/contacts?id=${id}`);
	return {
		type: DELETE_CONTACT,
		payload: request
	};
}

export function _editContacts(id) {
	return {
		type: EDIT_CONTACT,
		payload: id
	};
}

export function _updateContacts(firstname, lastname, email, id) {
	const request = axios.put(`api/contacts?id=${id}`, {
		contact: {
			firstName: firstname,
			lastName: lastname,
			email: email
		},
		id: id
	});
	return {
		type: UPDATE_CONTACT,
		payload: request
	};
}
