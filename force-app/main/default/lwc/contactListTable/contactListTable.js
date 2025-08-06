import { LightningElement, track, wire } from 'lwc';
import getAllContacts from '@salesforce/apex/EmployeeController.getAllContacts';
import ThirdPartyAccountLinkKey from '@salesforce/schema/ThirdPartyAccountLink.ThirdPartyAccountLinkKey';

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

    handleSetSize(event) {
        const newSize = parseInt(event.detail.value, 10);

        if (!isNaN(newSize) && newSize > 0) {
            this.pageSize = newSize;
            this.rebuildPages(); // REBUILD based on new page size
        }
    }


    rebuildPages() {
        if (!this.Contacts || this.Contacts.length === 0) return;

        this.totalPages = Math.ceil(this.Contacts.length / this.pageSize);
        this.AllPage = [];

        for (let i = 0; i < this.Contacts.length; i += this.pageSize) {
            this.AllPage.push(this.Contacts.slice(i, i + this.pageSize));
        }

        // Always reset to first page when changing size
        this.setPage(1);
    }

}
