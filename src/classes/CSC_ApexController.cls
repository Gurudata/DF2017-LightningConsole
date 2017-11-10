public with sharing class CSC_ApexController {
    
    @AuraEnabled
    public static List<ListView> getListViews() {
        List<ListView> listviews = 
            [SELECT Id, Name FROM ListView WHERE SobjectType = 'Company__c' and Name='All Company'];
        
        // Perform isAccessible() check here
        return listviews;
    }
    
    @AuraEnabled
   public static list < contact > fetchContact(String sortField, boolean isAsc) {
      String sSoql = 'SELECT Account.Name, AccountId, Region__c,firstName, LastName, Department, MobilePhone ';
      sSoql += 'From contact where Account.Name!=null';
      system.debug('sortField-->' + sortField);
 
      if (sortField != '') {
         sSoql += ' order by ' + sortField;
 
    // if isAsc is equal tp ture then set 'asc' order otherwise set 'desc' order.
         if (isAsc) {
            sSoql += ' asc';
         } else {
            sSoql += ' desc';
         }
      }
   // set record limit to query 
      sSoql += ' LIMIT 30';
 
      System.debug('@Developer -->sSoql:' + sSoql);
      list <contact> lstResult;
      try {
         system.debug('The query is' + sSoql);
         lstResult = Database.query(sSoql);
         List < contact > returnConList = new List < contact > ();
 
         for (contact c: lstResult) {
            returnConList.add(c);
          }
         return returnConList;
      } 
      catch (Exception ex) {
         // for handle Exception
         return null;
      }
   }
   @AuraEnabled
   public static list < contact > fetchContact1(String sortField, boolean isAsc) {
      String sSoql = 'SELECT Account.Name, AccountId, firstName, LastName, Department, MobilePhone ';
      sSoql += 'From contact where Account.Name!=null';
      system.debug('sortField-->' + sortField);
 
      if (sortField != '') {
         sSoql += ' order by ' + sortField;
 
    // if isAsc is equal tp ture then set 'asc' order otherwise set 'desc' order.
         if (isAsc) {
            sSoql += ' asc';
         } else {
            sSoql += ' desc';
         }
      }
   // set record limit to query 
      sSoql += ' LIMIT 200';
 
      System.debug('@Developer -->sSoql:' + sSoql);
      list <contact> lstResult;
      try {
         system.debug('The query is' + sSoql);
         lstResult = Database.query(sSoql);
         List < contact > returnConList = new List < contact > ();
 
         for (contact c: lstResult) {
            returnConList.add(c);
          }
         return returnConList;
      } 
      catch (exception ex) {
         // for handle Exception
         return null;
      }
   }
}