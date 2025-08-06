import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/EmployeeController.getAccounts';

export default class RelatedAccount extends LightningElement {
    @track accountOptions;
    @track error;

    @wire(getAccounts)
    wiredAccounts({data}){
        if(data){
            this.accountOptions=data.map(account =>({
                label:account.Name,
                value:account.Id
            }));
        }
        else {
            this.error = error;
            this.accountOptions = undefined
        }
    }
}