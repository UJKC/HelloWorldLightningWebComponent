import { api, LightningElement, track, wire } from 'lwc';
import getEmployeeById from '@salesforce/apex/EmployeeController.getEmployeeById';

export default class RecordDetailCard extends LightningElement {
    @api recordId;
    @track employee;
    @track error;

    @wire(getEmployeeById, { employeeId: '$recordId'})
    wiredEmployee({error, data}) {
        if (data) {
            this.employee = data;
            this.error = undefined;
        }
        else {
            this.error = error;
            this.employee = undefined
        }
    }

}