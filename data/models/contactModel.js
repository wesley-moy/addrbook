import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId //is automatically generated by mongo
  firstName: String,
  lastName: String,
  email: String
});

let Contacts = mongoose.model('Contacts', ContactSchema);
exports.ContactModel = Contacts;

/**
 * adds new contact
 * @param  {String} firstName value for the name of the new contact
 * @param  {String} lastName value for the last name of the new contact
 * @param  {String} email value for the email of the new contact
 * @return {Contact} newly created contact
 */
exports.addContact = (firstName, lastName, email) => {
  console.log("contactSchema.js: adding contact");
  //console.log('  text: ' + text);
  let newContact = new Contacts({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
  return new Promise((resolve, reject) => {
    newContact.save(
      (err, contact) => {
        err ? reject(err) : resolve(contact);
      }
    );
  });
}

/**
 * @return {int} number of items
 */
exports.getNumItems = () => {
  console.log('contactModel.js: getting number of Contacts in mongo');
  return new Promise((resolve, reject) => {
    Contacts.count(
      {},
      (err, count) => {
        err ? reject(err) : resolve(count);
      }
    );
  });
}

/**
 * deletes single contact by _id
 * @param  {String} _id
 * @return {Contact} the deleted contaact
 */
exports.deleteOne = (_id) => {
  console.log('contactSchema.js: deleting contact');
  //console.log('  _id: ' + _id);
  return new Promise((resolve, reject) => {
    Contacts.findByIdAndRemove(
      { _id: _id },
      (err, contact) => {
        //console.log(item);
        err ? reject(err) : resolve(contact);
      }
    );
  });
}

/**
 * gets all contacts
 * @return {[Contact]} list of Contacts
 */
exports.getContacts = () => {
  console.log('getting all contacts from mongo');
  return new Promise((resolve, reject) => {
    Contacts.find(
      {},
      (err, contacts) => {
        //console.log(' ' + items.length);
        err ? reject(err) : resolve(contacts);
      }
    );
  });
}

/**
 * provides initial info
 * @return {[{_id}]} list of Contact id's
 */
exports.getContactIds = () => {
  console.log('getting all contact ids from mongo');
  return new Promise((resolve, reject) => {
    Contacts.find(
      {},
      '_id',
      (err, contacts) => {
        err ? reject(err) : resolve(contacts);
      }
    );
  });
}

/**
 * fetches single contact
 * @return {Contact}
 */
exports.getContact = () => {
  console.log('getting contact');
  return new Promise((resolve, reject) => {
    Contacts.findOne(
      {},
      (err, contact) => {
        err ? reject(err) : resolve(contact);
      }
    );
  });
};

/**
 * fetches single contact by _id
 * @param  {String} _id
 * @return {Contact} contact if matching _id is found
 */
exports.getContactById = (_id) => {
  console.log('getting contact by id');
  //console.log("  _id: " + _id);
  return new Promise((resolve, reject) => {
    Contacts.findOne(
      {_id: mongoose.Types.ObjectId(_id)},
      (err, contact) => {
        err ? reject(err) : resolve(contact);
      }
    );
  });
};

/**
 * updates a single contact
 * @param  {String} _id
 * @param  {String} firstName
 * @param  {String} lastName
 * @param  {String} email
 * @return {Contact} updated contact
 */
exports.updateContact = (_id, firstName, lastName, email) => {
  console.log('updating contact in mongo');
  //console.log("  _id: " + _id + ", text: " + text);
  return new Promise((resolve, reject) => {
    Contacts.findByIdAndUpdate(
      {_id: mongoose.Types.ObjectId(_id)},     // find by this id
      {firstName: firstName, lastName: lastName, email: email,},      // update this attribute with arg value
      {new: true},       // return updated object instead of original
      (err, contact) => {
        console.log(contact);
        err ? reject(err) : resolve(contact);
      }
    );
  });
};
