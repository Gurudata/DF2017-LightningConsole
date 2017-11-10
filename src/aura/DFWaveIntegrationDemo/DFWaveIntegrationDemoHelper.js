({
	onLoad: function(component, event, sortField) {
      //call apex class method
      var action = component.get('c.fetchContact');
 
      // pass the apex method parameters to action 
      action.setParams({
         'sortField': sortField,
         'isAsc': component.get("v.isAsc")
      });
      action.setCallback(this, function(response) {
         //store state of response
         var state = response.getState();
         if (state === "SUCCESS") {
            //set response value in ListOfContact attribute on component.
            component.set('v.ListOfContact', response.getReturnValue());
             debugger;
         }
      });
      $A.enqueueAction(action);
   }
})