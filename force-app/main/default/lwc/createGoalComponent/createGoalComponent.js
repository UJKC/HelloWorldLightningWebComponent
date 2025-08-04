import { LightningElement, api, track } from 'lwc';
import createGoalForEmployee from '@salesforce/apex/EmployeeController.createGoalForEmployee';

export default class GoalCreation extends LightningElement {

    statusOptions = [
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Not Started', value: "Not Started" },
        { label: 'Completed', value: "Completed" },
    ]

    @api recordId;
    @track data;
    @track error;

    Name;
    Description;
    Date;
    selectedStatus;

    handleSubmit() {
        if (!this.Name || !this.Description || !this.Date || !this.selectedStatus) {
            this.error = 'All fields must be filled out';
            console.log(this.error);
            return;
        }

        
        this.error = null;
        this.data = null;

        
        createGoalForEmployee({
            Name: this.Name,
            Description: this.Description,
            targetDate: this.Date,
            Status: this.selectedStatus,
            EmpId: this.recordId
        })
        .then((result) => {
            
            this.data = result;
            console.log(result);
        })
        .catch((err) => {
           
            this.error = err.body.message || 'An error occurred while creating the goal.';
            console.log(this.error);
        });
    }

    handleOnChange(event) {
        const field = event.target.name;
        if (field === 'Name') {
            this.Name = event.target.value;
        } else if (field === 'Description') {
            this.Description = event.target.value;
        } else if (field === 'Date') { 
            this.Date = event.target.value;
        } else if (field === 'selectedStatus') {
            this.selectedStatus = event.target.value;
        }
    }
}
