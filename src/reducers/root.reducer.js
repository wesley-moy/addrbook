import { combineReducers } from 'redux';
import _contacts from './contacts.reducer';

const RootReducer = combineReducers({
	contacts: _contacts
});

export default RootReducer;