import { LightningElement, api, track, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class AssignedTrainings extends LightningElement {
    @api recordId;
    @track skills = [];
    @track error;

    columns = [
        { label: 'Name', fieldName: 'Name' }
    ];

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Employee_Trainings__r', // Child relationship API name
        fields: ['Employee_Training__c.Name']
    })
    wiredSkills({ error, data }) {
        if (data) {
            this.skills = data.records.map(rec => ({
                Id: rec.id,
                Name: rec.fields.Name.value
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.skills = [];
        }
    }
}
