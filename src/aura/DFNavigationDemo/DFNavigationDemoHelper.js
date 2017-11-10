({
	onLoad: function(component, event, sortField) {
        var self = this;
        //call apex class method
        var action = component.get('c.fetchContact1');
        var workspaceAPI = component.find("workspace");
        // pass the apex method parameters to action 
        action.setParams({
            'sortField': sortField,
            'isAsc': component.get("v.isAsc")
        });
        action.setCallback(this, function(response) {
            console.log('Inside onload callback');
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('Inside callback SUCCESS');
                //set response value in ListOfContact attribute on component.
                debugger;
                component.set('v.ListOfContact', response.getReturnValue());
                console.log('v.ListOfContact ' + component.get("v.ListOfContact"));
                debugger;
                this.setTabIcon(component);
                 debugger;
               this.setTabLabel(component);
            }
        });
        $A.enqueueAction(action);
    },
})