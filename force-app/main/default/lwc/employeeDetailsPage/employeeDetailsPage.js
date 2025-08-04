import { LightningElement,track,wire,api } from 'lwc';

import getEmployeeDetails from '@salesforce/apex/EmployeeController.getEmployeeDetails';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import {NavigationMixin} from 'lightning/navigation';
 
export default class EmployeeDetailsPage extends NavigationMixin (LightningElement) {

    @track employee;

    @api recordId;

    @track error;

    @track plans;

    @track reviews;

    @wire(getEmployeeDetails,{employeeId:'$recordId'})

    wiredEmployeeDetails({error,data}){

        if(data){

            this.employee=data.employee;

            this.reviews=data.reviews;

            this.plans=data.plans;

            this.error=undefined;

        }

        else if(error){

            this.error=error.body.message;

            this.reviews=undefined;

            this.employee=undefined;

            this.plans=undefined;

            this.dispatchEvent(new ShowToastEvent({

                title:'Error Leading Employee',

                message:this.error,variant:'error'

            }));

        }

    }

    

}
 