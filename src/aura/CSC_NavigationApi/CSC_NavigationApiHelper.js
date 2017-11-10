({
    cachetabinfo: function(component) {
        this.getTabInfo(component);
    },
    // Call this function from your controller for 
    // opening Primary Tab (Company) and subsequently Multiple subTabs (Accounts, Cases etc).
    //Eg: helper.openSobjectPrimSubTab(component, primaryRecordId, secondaryRecordId).
    openSobjectPrimSubTabs: function(component, primaryRecordId, secondaryRecordIds) {
        this.openSobjectPrimaryTab(component, primaryRecordId, null, this.openSobjectSubTabPromise, secondaryRecordIds);
    },
    // Call this function from your controller for 
    // opening Primary Tab (Company) and subsequently a related subTab (Account).
    //Eg: helper.openSobjectPrimSubTab(component, primaryRecordId, secondaryRecordId).
    openSobjectPrimSubTab: function(component, primaryRecordId, secondaryRecordId) {
        this.openSobjectPrimaryTab(component, primaryRecordId, secondaryRecordId, this.openSobjectSubTabIdApi);
    },
    // Call this function from your controller for 
    // 1. Opening Primary Tab only helper.openSobjectPrimaryTab(component, primaryRecordId)
    openSobjectPrimaryTab: function(component, primaryRecordId, secondaryRecordId, subTabCallback, secondaryRecordIds) {
        var workspaceApi = component.find("workspace");
        var urlString = '#/sObject/' + primaryRecordId + '/view';
        workspaceApi.openTab({
            url: urlString,
            focus: true
        }).then(function(response) {
            if (typeof(subTabCallback) !== "undefined" && typeof(secondaryRecordId) !== "undefined" && secondaryRecordId !== null) {
                
                subTabCallback(component, secondaryRecordId, response);
            };
            if (typeof(subTabCallback) !== "undefined" && typeof(secondaryRecordIds) !== "undefined" && secondaryRecordIds !== null) {
                var secondaryrecordId1 = secondaryRecordIds[0];
                var secondaryrecordId2 = secondaryRecordIds[1];
                var createsubTabPromise1 = subTabCallback(component, secondaryrecordId1, response);
                 
                createsubTabPromise1.then($A.getCallback(function(result) {                     
                    var createsubTabPromise2 = subTabCallback(component, secondaryrecordId2, response);
                    return createsubTabPromise2;
                })).then($A.getCallback(function(result) {
                    console.log('createsubTabPromise2 resolved ' + JSON.stringify(result));
                })).catch($A.getCallback(function(error) {
                    console.log('An error occurred in subtab promise: ' + JSON.stringify(error));
                }));
            };
        });
    },
    // Call this function from your controller for opening a record in subtab
    // eg:helper. openSobjectSubTab(component, recordId);
    openSobjectSubTab: function(component, recordId) {
        this.getTabInfo(component, this.openSobjectSubTabApi, recordId);
    },
    // Call this in your controller to set tab label.Label is set only on the focussed tab.
    //eg:helper.setTablabel(component)
    setTabLabel: function(component) {
        // If tabinfo is not populated on component
        if (component.get("v.tabinfo") === undefined || component.get("v.tabinfo") === null) {
            //populate tabinfo on component and set the label
            this.getTabInfo(component, this.setTabLabelApi);
        } else {
            // set the tab label
            this.setTabLabelApi(component);
        }
    },
    // Call this in your controller to set tab Icon.Tab Icon is set only on the focussed tab.
    // helper.setTabIcon(component)
    setTabIcon: function(component) {
        // If tabinfo is not populated on component
        debugger;
        if (component.get("v.tabinfo") === undefined || component.get("v.tabinfo") === null) {
        debugger;
            this.getTabInfo(component, this.setTabIconApi);
        } else {
        debugger;
            this.setTabIconApi(component);
        }
    },
    // Do not call this function from your controller. Used internally by the helper.
    setTabLabelApi: function(component) {
        debugger;
        var workspaceApi = component.find("workspace");
        console.log('@@@@ Inside setTabLabelApi');
        debugger;
        console.log('component.get"v.tabinfo".tabId' +component.get("v.tabinfo").tabId);
        console.log('component.get"v.tablabel' +component.get("v.tablabel"));
        
        if (component.get("v.tabinfo") !== undefined && component.get("v.tabinfo") !== null) {
            workspaceApi.setTabLabel({
                tabId: component.get("v.tabinfo").tabId,
                label: component.get("v.tablabel")
            }).then(function(response) {
                if (response !== null) {
                    console.log('JSON.stringify(response)' + JSON.stringify(response));
                } else {
                    console.log('Error in setTabLabelApi' + JSON.stringify(response));
                }
            });
        }
    },
    // Do not call this function from your controller. Used internally by the helper.
    setTabIconApi: function(component) {
        var workspaceApi = component.find("workspace");
        debugger;
        console.log('@@@@ Inside setTabIconApi');
        console.log('component.get"v.tabinfo".tabId' +component.get("v.tabinfo").tabId);
        console.log('component.get"v.tablabel' +component.get("v.tabicon"));
        debugger;
        if (component.get("v.tabinfo") !== undefined && component.get("v.tabinfo") !== null) {
            workspaceApi.setTabIcon({
                tabId: component.get("v.tabinfo").tabId,
                icon: component.get("v.tabicon"),
                iconAlt: "Loading.."
            }).then(function(response) {
                if (response !== null) {
                    console.log('JSON.stringify(response)' + JSON.stringify(response));
                } else {
                    console.log('Error in setTabIconApi' + JSON.stringify(response));
                }
            });
        }
    },
    // Do not call this function from your controller. Used internally by the helper.
    openSobjectSubTabApi: function(component, recordId) {
        var workspaceApi = component.find("workspace");
        var urlString = '#/sObject/' + recordId + '/view';
        debugger;
        workspaceApi.openSubtab({
            parentTabId: component.get("v.tabinfo").tabId,
            url: urlString,
            focus: true
        }).then(function(response) {
            if (response !== null) {
                 
                console.log('JSON.stringify(response)' + JSON.stringify(response));
            } else {
                console.log('Error in openSobjectSubTabApi' + JSON.stringify(response));
            }
        });
    },
    // Do not call this function from your controller. Used internally by the helper.
    openSobjectSubTabIdApi: function(component, recordId, primarytabId) {
        var workspaceApi = component.find("workspace");
        var urlString = '#/sObject/' + recordId + '/view';
        workspaceApi.openSubtab({
            parentTabId: primarytabId,
            url: urlString,
            focus: true
        }).then(function(response) {
            if (response !== null) {
                console.log('JSON.stringify(response)' + JSON.stringify(response));
                 
            } else {
                console.log('Error in openSobjectSubTabIdApi' + JSON.stringify(response));
            }
        });
    },
    // Do not call this function from your controller. Used internally by the helper.
    openSobjectSubTabPromise: function(component, recordId, primarytabId) {
        return new Promise(function(resolve, reject) {
            var workspaceApi = component.find("workspace");
            var urlString = '#/sObject/' + recordId + '/view';
            workspaceApi.openSubtab({
                parentTabId: primarytabId,
                url: urlString,
                focus: true
            }).then(function(response) {
                if (response !== null) {
                    console.log('JSON.stringify(response)' + JSON.stringify(response));
                    resolve(response);
                } else {
                    console.log('Error in openSubtabcallback' + JSON.stringify(response));
                    reject(Error("Error message: " + JSON.stringify(response)));
                }
            });
        });
    },
    // Do not call this method from your controller. Used internally by the helper.
    getTabInfo: function(component, callback, recordId) {
        var workspaceApi = component.find("workspace");
        workspaceApi.getFocusedTabInfo().then(function(response) {
           debugger; 
            if (response !== null) {
                if (typeof(recordId) !== "undefined") {
                    debugger; 
                    callback(component, recordId);
                } else if (typeof(response.title) !== "undefined" && response.title === "Loading..." && typeof(response.customTitle) === "undefined") {
                    if (component.get("v.tabinfo") === undefined || component.get("v.tabinfo") === null) {
                       debugger; 
                        component.set("v.tabinfo", response);
                    }
                    if (typeof(callback) != "undefined") {
                        debugger; 
                        component.set("v.tabinfo", response);
                        callback(component);
                    }
                }
            } else {
                console.log('Error in getFocusedTabInfocallback');
            }
        });
    }
})