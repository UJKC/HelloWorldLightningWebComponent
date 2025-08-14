import { LightningElement, api, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';

export default class FeedbackForm extends LightningElement {
    @api recordId;
    @track EmployeeBy;
    @track Content;
    @track Sentiment;
    @track Name;
    @track error;

    // Get the Employee record once
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    wiredEmployee({ error, data }) {
        if (data) {
            this.Name = data.fields.Name.value;
            this.error = undefined;
        } else {
            this.error = error;
            this.Name = undefined;
        }
    }

    handleInput(event) {
        const field = event.target.fieldName;
        if (field === 'Submitted_By__c') {
            this.EmployeeBy = event.target.value;
        } else if (field === 'Content__c') {
            this.Content = event.target.value;
        } else if (field === 'Sentiment__c') {
            this.Sentiment = event.target.value;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let fields = {};
        fields["Employee__c"] = this.recordId;
        fields["Submitted_By__c"] = this.EmployeeBy;
        fields["Content__c"] = this.Content;
        fields["Sentiment__c"] = this.Sentiment;
        fields["Name"] = this.Name + "Feedback 2025";

        createRecord({
            apiName: "Feedback__c",
            fields
        })
        .then(() => {
            // success handling
        })
        .catch(error => {
            this.error = error;
        });
    }
}
