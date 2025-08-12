import { LightningElement, api } from 'lwc';

export default class PerformanceReviewForm extends LightningElement {
    @api recordId;

    get defaultValues() {
        return {
            Employee__c: this.recordId
        };
    }

    handleSuccess(event) {
        console.log('Performance Review saved with Id:', event.detail.id);
    }
}
