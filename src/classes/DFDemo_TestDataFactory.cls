/*
* Developer: Codey
* Description: Class to generate test data for Dreamforce
*/
public class DFDemo_TestDataFactory {

    /** Method to Create data for test cases
    **@param: iNum- no of test accounts to be created
    **/
     public static void createAccountsWithContacts(Integer iNum){
         List<Account> acctList = new List<Account>();
         for(Integer i = 0; i < iNum; i++){
                  Account testAcc = new Account();
                  testAcc.Name = 'DFDemo_TestAccount ' + i;
                  acctList.add(testAcc);
         }
         insert acctList;
    
         List<Contact> cntList = new List<Contact>();
         for(Account acct : acctList){
                Contact tstContact = new Contact();
                tstContact.AccountId = acct.id;
                tstContact.FirstName = 'cnt_'+acct.name;
                tstContact.LastName = ' DF2017';
                tstContact.Department = 'dept1';
                tstContact.MobilePhone = '123446789';
                cntList.add(tstContact);
               
          }
          insert cntList;
     }//end of method
}//end of class