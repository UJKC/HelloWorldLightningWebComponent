public with sharing class TrainingHelper {
    @AuraEnabled(cacheable=true)
    public static String getTrainingName(Id trainingId) {
        Training__c t = [SELECT Name FROM Training__c WHERE Id = :trainingId LIMIT 1];
        return t != null ? t.Name : null;
    }
}
