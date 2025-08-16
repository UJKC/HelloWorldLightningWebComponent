import { LightningElement, api, track, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class EmployeeFeedback extends LightningElement {
    @track Sentiment;
    @api recordId;
    @track Feedback;
    @track error;
    allFeedback = [];

    columns = [
        { label: "Content", fieldName: "Content__c" },
        { label: "Sentiment", fieldName: "Sentiment__c" },
        { label: "Feedback Date", fieldName: "Feedback_Date__c", type: "date" },
    ];

    handleChange(event) {
        let name = event.target.fieldName;
        if (name === "Sentiment__c") {
            this.Sentiment = event.target.value;
            this.filterFeedback();
        }
    }

    filterFeedback() {
        if (this.Sentiment) {
            this.Feedback = this.allFeedback.filter(
                rec => rec.Sentiment__c === this.Sentiment
            );
        } else {
            this.Feedback = [...this.allFeedback];
        }
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Feedbacks__r',
        fields: [
            'Feedback__c.Content__c',
            'Feedback__c.Sentiment__c',
            'Feedback__c.Feedback_Date__c'
        ]
    })
    WiredFeedback({ error, data }) {
        if (data) {
            console.log('Related list data:', data);
            this.allFeedback = data.records.map(rec => ({
                Id: rec.id,
                Content__c: rec.fields?.Content__c?.value,
                Sentiment__c: rec.fields?.Sentiment__c?.value,
                Feedback_Date__c: rec.fields?.Feedback_Date__c?.value
            }));
            this.filterFeedback();
            this.error = undefined;
        } else if (error) {
            console.error('Error:', error);
            this.error = error;
            this.Feedback = undefined;
        }
    }
}
