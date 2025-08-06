import { LightningElement, track, wire } from 'lwc';
import getAllContacts from '@salesforce/apex/EmployeeController.getAllContacts';

export default class ContactListTable extends LightningElement {
    @track Contacts;
    @track error;
    @track totalPages;
    @track pageSize = 5;
    @track AllPage = [];
    @track perPage = [];
    @track currentPage = 1;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    @wire(getAllContacts)
    WiredContact({ error, data }) {
        if (data) {
            this.Contacts = data;
            this.error = undefined;
            console.log('contacts: ', JSON.stringify(this.Contacts, null, 2));
            
            this.totalPages = Math.ceil(data.length / this.pageSize);
            this.AllPage = [];

            for (let i = 0; i < data.length; i += this.pageSize) {
                this.AllPage.push(data.slice(i, i + this.pageSize));
            }

            this.setPage(1);
        } else {
            this.error = error;
            this.Contacts = undefined;
        }
    }

    setPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;

        this.currentPage = pageNumber;
        this.perPage = this.AllPage[pageNumber - 1];
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.setPage(this.currentPage + 1);
        }
    }

    handlePrev() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    get disablePrev() {
        return this.currentPage === 1;
    }

    get disableNext() {
        return this.currentPage === this.totalPages;
    }

    get currentPageNumber() {
        return this.currentPage;
    }

    get totalPageNumber() {
        return this.totalPages;
    }
}
