import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import GetGoalsByEmpId from '@salesforce/apex/EmployeeController.GetGoalsByEmpId';

export default class GoalListDisplay extends NavigationMixin(LightningElement) {
    @api recordId;
    @track Goal;
    @track error;

    @wire(GetGoalsByEmpId, { empId: '$recordId' })
    wiredGoals({ error, data }) {
        if (data) {
            this.Goal = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.Goal = undefined;
            console.error('Error fetching goals:', error);
        }
    }

    handleGoalClick(event) {
        const goalId = event.currentTarget.dataset.id;
        console.log('Navigating to Goal ID:', goalId);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: goalId,
                objectApiName: 'Goal__c',
                actionName: 'view'
            }
        })
    }
}