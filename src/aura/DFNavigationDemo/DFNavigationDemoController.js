({
   loadContactList: function(component, event, helper) {
        // By Default make sort field is 'FirstName' of contact object
        // call the helper function with pass sortField Name
        debugger;
        helper.onLoad(component, event, 'FirstName');
    },
  openPrimaryFromNavigationAPI: function(component, event, helper) {
            var contactList = component.get('v.ListOfContact');
            var target = event.target;
            while (target && !target.dataset.index) {
                target = target.parentNode;
            }
            if (target) {
                console.log(target.dataset.index);
            }
            var index = event.target.dataset.index;
            console.log('index ' + index);
        	var recordId = component.get("v.ListOfContact")[index].AccountId;
        	helper.openSobjectPrimSubTab(component, recordId, null);
        	console.log('even' + event);
            
        },
    opensobjectTabUsingEvent: function(component, event, helper) {
        var index = event.target.dataset.index;
        console.log('index ' + index);
        console.log('v.ListOfContact' + component.get("v.ListOfContact"));
        console.log('v.ListOfContact[index]' + component.get("v.ListOfContact")[index].AccountId);
        var recordId = component.get("v.ListOfContact")[index].AccountId;
        var navEvt1 = $A.get("e.force:navigateToSObject");
        navEvt1.setParams({
            "recordId": recordId
        });
        navEvt1.fire();
    },
    opensubTabAPI: function(component, event, helper) {      
        var index = event.target.dataset.index;         
        var recordId = component.get("v.ListOfContact")[index].Id;
        var primaryrecordId = component.get("v.ListOfContact")[index].AccountId;
        console.log(recordId); 
        console.log(primaryrecordId); 
        // opens the record in subtab
    	debugger;
        helper.openSobjectPrimSubTab(component, primaryrecordId, recordId);
        //helper.openSobjectSubTab(component, recordId);               
    },
   
    
})