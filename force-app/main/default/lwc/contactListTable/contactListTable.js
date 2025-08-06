import { LightningElement, track, wire } from 'lwc';
import getAllContacts from '@salesforce/apex/EmployeeController.getAllContacts';

export default class ContactListTable extends LightningElement {
    @track Contacts;
    @track error;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    @wire(getAllContacts)
    WiredContact({error, data}) {
        if (data) {
            this.Contacts = data;
            this.error = undefined;
            console.log('contacts: ', JSON.stringify(this.Contacts, null, 2));
        }
        else {
            this.error = error;
            this.Contacts = undefined;
        }
    }
}