import mongoose from 'mongoose';

import { ContactModel as Contact } from '../data/models/contactModel';

mongoose.connect('mongodb://localhost:27017/address-book');

Contact.remove({}, (err) => {
   err ? reject(err) : console.log('collection removed');
});

let contact1 = new Contact({
  firstName: "Test",
  lastName: "Testson",
  email: "test@mail.com",
});

contact1.save((err, contact) => {
  err ? reject(err) : console.log('added contact: ' + contact);
  mongoose.disconnect();
});
