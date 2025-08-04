import { LightningElement, wire, track } from 'lwc';
import getEmployees from '@salesforce/apex/EmployeeController.getEmployees';

export default class EmployeeList extends LightningElement {
    @track employees;
    @track error;
    
    @wire(getEmployees)
    wiredEmployees({error, data}) {
        if(data) {
            this.employees = data;
            this.error = undefined;
        }
        else {
            this.error = error;
            this.employees = undefined;
        }
    }
}