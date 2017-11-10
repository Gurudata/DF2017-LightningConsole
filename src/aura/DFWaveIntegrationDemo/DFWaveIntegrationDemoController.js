({
    loadContactList: function(component, event, helper) {
        // By Default make sort field is 'FirstName' of contact object
        // call the helper function with pass sortField Name
        helper.onLoad(component, event, 'FirstName');
    },
    handleselectionChanged: function(component, event, helper) {
        var params = event.getParams();
        var payload = params.payload;
        if (payload) {
            var step = payload.step;
            var data = payload.data;
            console.log('JSON.stringify(payload.step)' + JSON.stringify(payload.step));
            console.log('JSON.stringify(payload.data)' + JSON.stringify(payload.data));
            data.forEach(function(obj) {
                for (var k in obj) {
                    if (k === 'Region') {
                        console.log('obj[k] ' +obj[k]);
                        component.set("v.region", obj[k]);
                    }
                }
            });
        }
    },
    passRegion: function(component, event, helper) {
        console.log('Inside passRegion');
        var target = event.target;
        while (target && !target.dataset.rowIndex) {
            target = target.parentNode;
        }
        if (target) {
            console.log(target.dataset.rowIndex);
        }
        var index = target.dataset.rowIndex;
        console.log('index ' + index);
        console.log('v.ListOfContact' + component.get("v.ListOfContact"));
        console.log('v.ListOfContact[index]' + component.get("v.ListOfContact")[index].Region__c);
        var region = component.get("v.ListOfContact")[index].Region__c;
        var filter={};
        var datasetName='AccountACV1';
        var regionFilter='Region';
        debugger;
        filter[datasetName]={};
        filter[datasetName][regionFilter]=[];
        filter[datasetName][regionFilter][0]=region;
        
        console.log('JSON.stringify(filter)' + JSON.stringify(filter));
        
        component.set('v.filter', JSON.stringify(filter));
        var evt = $A.get('e.wave:update');
        
        evt.setParams({
            id: "0FK1I000000E1eEWAS",
            value: component.get('v.filter'),
            type: "dashboard"
        }); evt.fire();
    },
    refresh:function(component, event, helper) {
        component.set("v.region", ""); 
        var filter={};
        var datasetName='AccountACV1';
        var regionFilter='Region';
        debugger;
        filter[datasetName]={};
        filter[datasetName][regionFilter]=[];
        filter[datasetName][regionFilter][0]="";
        
        console.log('JSON.stringify(filter)' + JSON.stringify(filter));
        
        component.set('v.filter', JSON.stringify(filter));
        var evt = $A.get('e.wave:update');
        
        evt.setParams({
            id: "0FK1I000000E1eEWAS",
            value: component.get('v.filter'),
            type: "dashboard"
        }); evt.fire();
    }
})