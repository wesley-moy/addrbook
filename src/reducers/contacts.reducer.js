import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, FETCH_CONTACT, UPDATE_CONTACT } from '../actions/contacts.actions';

const INITIAL_STATE = {
	contacts: [],
	primaryContact: null
};

export default function _contacts(state = INITIAL_STATE, action) {
	switch(action.type) {
		case ADD_CONTACT:
			return {...state, contacts: action.payload.data};
		case DELETE_CONTACT:
			return {...state, contacts: action.payload.data};
		case EDIT_CONTACT:
			return {...state, primaryContact: state.contacts[action.payload]};
		case UPDATE_CONTACT:
			return {...state, contacts: action.payload.data};
		default:
			return state;
	}
}
