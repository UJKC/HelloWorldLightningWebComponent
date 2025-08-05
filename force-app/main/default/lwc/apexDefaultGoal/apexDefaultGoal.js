import { LightningElement, api, track } from 'lwc';
import createGoalForEmployee from '@salesforce/apex/EmployeeController.createGoalForEmployee';

export default class GoalCreation extends LightningElement {

    @api recordId;
    @track data;
    @track error;

    handleSubmit() {

        
        this.error = null;
        this.data = null;

        
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() + 3);

        createGoalForEmployee({
            Name: 'Default Goal',
            Description: 'Default',
            targetDate: targetDate,
            Status: 'In Progress',
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
}
