import { LightningElement, track, api, wire } from 'lwc';
import getskills from '@salesforce/apex/EmployeeController.getskills';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
 
export default class AssignedSkills extends NavigationMixin(LightningElement){
    @track skills;
    @track error;
    @api recordId;

    actions = [
        { label: 'View', name: 'view_record' },
        { label: 'Edit', name: 'edit_record' }
    ];
 
    columns = [
        { label: 'Skill Name', fieldName: 'SkillName', sortable: true },
        { label: 'Proficiency Level', fieldName: 'Proficiency_Level__c' },
        { label: 'Last Accessed', fieldName: 'Last_Assessed__c' },
        {
            type: 'action',
            typeAttributes: { rowActions: this.actions }
        }
    ];
 
    @wire(getskills, { recordId: '$recordId' })
    wiredSkills({ error, data }) {
        if (data) {
            this.skills = data.map(i=>({...i,SkillName:i.Skill__r?.Name||'N/A'}));
            this.error = undefined;
        } else if (error) {
            this.error = error.body ? error.body.message : 'Unknown Error';
            this.skills = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading skills',
                    message: this.error,
                    variant: 'error'
                })
            );
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'view_record':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Skill__c',
                        actionName: 'view'
                    }
                });
                break;

            case 'edit_record':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Skill__c',
                        actionName: 'edit'
                    }
                });
                break;
        }
    }

}