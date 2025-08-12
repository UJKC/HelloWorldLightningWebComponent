import { LightningElement, track, api } from 'lwc';
import savePR from '@salesforce/apex/EmployeeController.savePR';

export default class PerformanceReviewFormActualTry extends LightningElement {
    @track PR
    @track PRR
    @track PRP
    @track PRC
    @api recordId

    onChangeInput(event) {
        let name = event.target.name;
        if (name == "PR") {
            this.PR = event.target.value;
        }
        else if (name == "PRP") {
            this.PRP = event.target.value;
        }
        else if (name == "PRC") {
            this.PRC = event.target.value;
        }
        else if (name == "PRR") {
            this.PRR = parseInt(event.target.value, 10);;
        }
    }

    Save() {
        savePR({ PR: this.PR, PRR: this.PRR, PRP: this.PRP, PRC: this.PRC, id: this.recordId })
            .then(() => console.log('Success'))
            .catch(error => console.log(error));

    }
}