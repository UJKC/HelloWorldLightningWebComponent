import { LightningElement, api, track, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import GetCareerPlanByEmpId from "@salesforce/apex/EmployeeController.GetCareerPlanByEmpId";


export default class CareerPlanListDisplay extends LightningElement {
    @api recordId;
    @track Plan;
    @track error;

    columns = [
        { label: "Plan Name", fieldName: "Name", sortable: true },
        { label: "Target Role", fieldName: "Target_Role__c" },
        { label: "Target Date", fieldName: "Target_Date__c", type: "date", sortable: true },
        { label: "Status", fieldName: "Status__c", sortable: true },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'View', name: 'view' }
                ]
            }
        }
    ];


    @wire(GetCareerPlanByEmpId, { empId: "$recordId" })
    wiredGoals({ error, data }) {
        if (data) {
            this.Plan = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.Plan = undefined;
            console.error("Error fetching goals:", error);
        }
    }

}