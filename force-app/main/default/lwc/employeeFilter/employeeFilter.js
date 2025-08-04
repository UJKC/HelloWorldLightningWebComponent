import { LightningElement, track, wire } from 'lwc';
import getEmployeesByDepartment from '@salesforce/apex/EmployeeController.getEmployeesByDepartment';

export default class EmployeeFilter extends LightningElement {
    departmentOptions = [
        {label: 'All Department', value: ''},
        {label: 'Engineering', value: "Engineering"},
        {label: 'HR', value: "HR"},
        {label: 'Sales', value: "Sales"},
        {label: 'IT Consulting', value: "IT Consulting"},
        {label: 'Marketing', value: "Marketing"},
    ]

    @track employees;
    @track error;
    @track selectedDepartment = '';

    @wire(getEmployeesByDepartment, {employeeDepartment: '$selectedDepartment'})
    wiredEmployees({error, data}){
        if(data) {
            this.employees = data;
            this.error = undefined;
        }
        else {
            this.error = error;
            this.employees = undefined;
        }
    }

    handleDepartmentChange(event) {
        this.selectedDepartment = event.detail.value;
    }
}