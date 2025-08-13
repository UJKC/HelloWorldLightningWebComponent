public with sharing class ContactController {

        @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        Boolean simulateError = true; // ✅ Set to true to simulate error

        if (simulateError) {
            throw new AuraHandledException('Simulated error for testing.');
        }

        return [SELECT FirstName, LastName, Email FROM Contact];
    }

        }

