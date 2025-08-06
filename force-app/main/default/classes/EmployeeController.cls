public with sharing class EmployeeController {

    @AuraEnabled(cacheable = true)
    public static List<Employee__c> getEmployees(){
        try {
            return [Select Id, Name, Employee_ID__c, Department__c from Employee__c Order By Name];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static Employee__c getEmployeeById(String employeeId){
        try {
            return [Select Id, Name, Employee_ID__c, Department__c from Employee__c where Id = :employeeId Limit 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<Employee__c> getEmployeesByDepartment(String employeeDepartment){
        try {
            if(employeeDepartment == '') {
                return [Select Id, Name, Employee_ID__c, Department__c from Employee__c];
            }
            else {
            return [Select Id, Name, Employee_ID__c, Department__c from Employee__c where Department__c = :employeeDepartment];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,Object> getEmployeeDetails(String employeeId){

        try{

            Employee__c employee=[Select id,name,Employee_ID__c,Department__c,Job_Role__c,Email__c,

            Region__c,Hire_Date__c,Salary__c from Employee__c where id=:employeeId Limit 1];

            list<Performance_Review__c> reviews =[Select Id,Name,Review_Period__c,Rating__c from 

            Performance_Review__c where Employee__c =: employeeId 

            Order By Review_Period__c DESC ];
 
            list<Career_Plan__c> plans=[select Id,name,Target_Role__c,Status__c from Career_Plan__c

            where  Employee__c =: employeeId Order By Target_Date__c DESC  ];
 
            return new Map<string,Object>{

                'employee' =>employee,

                'reviews' => reviews,

                'plans' => plans

            };
 
        }catch(Exception e){

             throw new AuraHandledException(e.getMessage());
 
        }
 
    }

    @AuraEnabled(cacheable = true)
    public static Goal__c createGoalForEmployee(String Name, String Description, Date targetDate, String Status, Id EmpId) {
        try {
            Goal__c newGoal = new Goal__c(
                Name = Name,
                Description__c = Description,
                Target_Date__c = targetDate,
                Status__c = Status,
                Employee__c = EmpId
            );
            insert newGoal;
            return newGoal;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating goal: ' + e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Goal__c> GetGoalsByEmpId(String empId) {
        try {
            list<Goal__c> goals = [SELECT Employee__c, Name, Status__c, Target_Date__c FROM Goal__c WHERE Employee__c = :empId];
            return goals;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<Career_Plan__c> GetCareerPlanByEmpId(String empId) {
        try {
            list<Career_Plan__c> cp = [SELECT Id, Name, Target_Role__c, Target_Date__c, Status__c FROM Career_Plan__c WHERE Employee__c = :empId];
            return cp;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> getAllContacts(){
        try {
            List<Contact> c = [Select Id, Name, Email, Phone from Contact];
            return c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
