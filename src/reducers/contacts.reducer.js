import { ADD_CONTACT, FETCH_CONTACTS } from '../actions/contacts.actions';

const INITIAL_STATE = {contacts: []};

export default function _contacts(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_CONTACT:
			console.log(action.payload);
			return {...state, contacts: action.payload.data.contacts};
		case FETCH_CONTACTS:
			return {...state, contacts: action.payload.data.contacts};
		default:
			return state;
	}
}