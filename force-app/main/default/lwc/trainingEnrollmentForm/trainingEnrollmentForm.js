import { LightningElement, api, wire, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getRecord } from 'lightning/uiRecordApi';
import EMPLOYEE_TRAINING_OBJECT from '@salesforce/schema/Employee_Training__c';
import EMPLOYEE_FIELD from '@salesforce/schema/Employee_Training__c.Employee__c';
import TRAINING_FIELD from '@salesforce/schema/Employee_Training__c.Training__c';
import STATUS_FIELD from '@salesforce/schema/Employee_Training__c.Status__c';
import NAME_FIELD from '@salesforce/schema/Employee_Training__c.Name';
import EMPLOYEE_NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import getTrainingName from '@salesforce/apex/TrainingHelper.getTrainingName';

export default class trainingEnrollmentForm extends LightningElement {
    @api recordId;
    trainingId;
    statusValue;
    employeeName;

    @wire(getRecord, { recordId: '$recordId', fields: [EMPLOYEE_NAME_FIELD] })
    wiredEmployee({ data, error }) {
        if (data) {
            this.employeeName = data.fields.Name.value;
        } else if (error) {
            console.error(error);
        }
    }

    handleChange(event) {
        if (event.target.fieldName === 'Training__c') {
            this.trainingId = event.target.value;
        } else if (event.target.fieldName === 'Status__c') {
            this.statusValue = event.target.value;
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const trainingName = await getTrainingName({ trainingId: this.trainingId });

        const fields = {};
        fields[EMPLOYEE_FIELD.fieldApiName] = this.recordId;
        fields[TRAINING_FIELD.fieldApiName] = this.trainingId;
        fields[STATUS_FIELD.fieldApiName] = this.statusValue;
        fields[NAME_FIELD.fieldApiName] = `${this.employeeName} ${trainingName}`;

        await createRecord({
            apiName: EMPLOYEE_TRAINING_OBJECT.objectApiName,
            fields
        });
    }
}
