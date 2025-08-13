import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { reduceErrors } from 'c/ldsUtils'; // ✅ Import error handler

import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class ContactList extends LightningElement {
    @track contactList;
    @track error;

    columns = [
        { label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName },
        { label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName },
        { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName },
    ];

    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contactList = data;
            this.error = undefined;
        } else {
            this.error = error;
            this.contactList = undefined;
        }
    }

    // ✅ Getter to expose reduced error messages
    get errors() {
        return reduceErrors(this.error);
    }
}
