import { LightningElement,wire,track } from 'lwc';
import getAccountDetails from "@salesforce/apex/EmployeeController.getAccountDetails";
import grco from "@salesforce/apex/EmployeeController.grco";
import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class RelatedAccount extends LightningElement {
    @track error
    @track accounts;
    @track selectedAccId;
    @track AccOptions=[];
    @track contacts;
    @track opportunities;
 
    contactcolumns=[
        {label:'Contact Name', fieldName:'Name', type:'text'},
        {label:'Email',fieldName:'Email', type:'email'},
        {label:'Phone',fieldName:'Phone', type:'phone'}
    ];
 
    oppcolumns=[
        {label:'Opportunity Name', fieldName:'Name', type:'text'},
        {label:'Stage',fieldName:'StageName', type:'text'},
        {label:'Amount',fieldName:'Amount', type:'currency'},
        {label:'Close Date', fieldName:'CloseDate',type:'date'}
    ];
    @wire(getAccountDetails)
    wiredaccounts({error,data}){
        if(data){
            this.accounts=data;
            this.error=undefined;
            this.AccOptions=data.map(account=>({
                label:account.Name, value:account.Id
            }));
        }
    }
    handleAccountChange(event){
        this.selectedAccId=event.detail.value;
    }
    @wire(grco,{employeeId:'$selectedAccId'})
    wiredgrco({error,data}){
        if(data){
            this.contacts=data.contacts;
            this.opportunities=data.opportunities;
            this.error=undefined;
        }
        else if(error){
            this.error=error.body?error.body.message:'Unknown Error';
            this.opportunities=undefined;
            this.contacts=undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Error',
                    message:error.body.message,
                    variant:'brand'
                })
            );
        }
 
    }
}