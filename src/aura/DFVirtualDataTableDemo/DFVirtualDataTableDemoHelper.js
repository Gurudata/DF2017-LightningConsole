({
    showSpinner: function(component) {
        $A.util.removeClass(component.find('spinner'), 'slds-hide');
    },
    hideSpinner: function(component) {
        $A.util.addClass(component.find('spinner'), 'slds-hide');
    },
    navigateToRecord: function(recordId) {
        console.log('navigating to record: ' + recordId);
        var event = $A.get('e.force:navigateToSObject');
        if (event) {
            event.setParams({
                'recordId': recordId
            }).fire();
        } else if ((typeof sforce !== 'undefined') && (typeof sforce.one !== 'undefined')) {
            sforce.one.navigateToSObject(recordId);
        } else {
            window.location.href = '/' + recordId;
        }
    },
    /**
     * actionName = the apex controller method to call (e.g. 'c.myMethod' )
     * params = JSON object specifying action parameters (e.g. { 'x' : 42 } )
     * successCallback = function to call when action completes (e.g. function( response ) { ... } )
     * failureCallback = function to call when action fails (e.g. function( response ) { ... } )
     */
    callAction: function(component, actionName, params, successCallback, failureCallback) {
        this.showSpinner(component);
        var action = component.get(actionName);
        if (params) {
            action.setParams(params);
        }
        action.setCallback(this, function(response) {
            
            if (component.isValid() && response.getState() === 'SUCCESS') {
                if (successCallback) {
                    successCallback(response.getReturnValue());
                    this.hideSpinner(component);
                }
            } else {
                console.error('Error calling action "' + actionName + '" with state: ' + response.getState());
                this.hideSpinner(component);
                if (failureCallback) {
                    failureCallback(response.getError(), response.getState());
                } else {
                    this.logActionErrors(component, response.getError());
                }
            }
        });
        $A.enqueueAction(action);
    },
    /**fetchpagesfromCache() is a big monolithic block it needs to be broken down
    // 1. Fills up the cache with 150 records on initial load 
    // 2. Access Cache to render records
    // 3. Replenish Cache when cache is running low on records. 
     **/
    fetchPagefromCache: function(component, event, eventType) {
        console.log('scrollUp=' + event.getParam('Name'));
        console.log('scrollUp=' + event.getParam('scrollUp'));
        console.log('!scrollUp=' + !event.getParam('scrollUp'));
        //debugger;
        if (!event.getParam('scrollUp')) {
            //debugger;
            this.showSpinner(component);
        }
       
       console.log('handling page change event in app container');
       console.log('event ' +JSON.stringify(event));
       // debugger;
        console.log('page=' + event.getParam('pageNumber'));
        console.log('pageSize=' + event.getParam('pageSize'));
        var rowstodisplay = {};
        var tableCmp = component.find('dataTable');
        var pageBlockSize = event.getParam('pageSize');
        var recordsInCache = component.get('v.cachedrows');
        var firstLoad;
        console.log('Object.keys(recordsInCache).length ' + Object.keys(recordsInCache).length);
        // if the page does not exist in cache fill the cache. 
        //This should just happen on init (component load) or if no data is returned from server.
        if (Object.keys(recordsInCache).length == 0) {
            console.log('Filling the cache from db');
            firstLoad = "true";
            //debugger;
            //No records in cache, fill the cache
            this.callAction(component, 'c.getContacts', {
                'page': event.getParam('pageNumber'),
                'pageSize': event.getParam('pageSize') * 30,
                'sortCol': eventType=='handlePageChangeEvent'?tableCmp.get('v.sortColumnName'):event.getParam( 'columnName'),
                'sortDir': eventType=='handlePageChangeEvent'?tableCmp.get('v.sortDirection'): event.getParam( 'sortDirection')

            }, function(data) {
                //var tableCmp = component.find( 'dataTable' );
                //var rows = tableCmp.get( 'v.rows' );
                //tableCmp.set( 'v.rows', rows.concat( data ));
                
                console.log('success data ' + data);
                component.set('v.cachedrows', recordsInCache.concat(data));
                //populate the cache
                recordsInCache = data;
                //debugger;
                var totalPagesinCache = Math.round((Object.keys(recordsInCache).length) / pageBlockSize);
                console.log('totalPagesinCache  after dbcall' + totalPagesinCache);
                //debugger;
                tableCmp.set('v.rows', data.slice(0, 50));
                tableCmp.set('v.pageNumber', 10);
                //debugger;
            });
        } else {
            firstLoad = "false";
        };
        // Access Cache
        //total number of pages in cache
        //debugger;
        var totalPagesinCache = Math.round((Object.keys(recordsInCache).length) / pageBlockSize);
        //debugger;
        var requestedPageNumber = event.getParam('pageNumber');
        //debugger;
        var pageSize = event.getParam('pageSize');
        //debugger;
        // If records in cache access cache 
        console.log('Object.keys(recordsInCache).length ' + Object.keys(recordsInCache).length);
        console.log('requestedPageNumber' + requestedPageNumber);
        console.log('totalPagesinCache ' + totalPagesinCache);
        //debugger;
        /**If records in cache access cache  **/
        if (Object.keys(recordsInCache).length > 0 && requestedPageNumber <= totalPagesinCache && firstLoad != "true") {
           console.log(' Accessing records from cache');
           // debugger;
            console.log('recordsInCache ' + Object.keys(recordsInCache).length);
            console.log('requestedPageNumber ' + requestedPageNumber);
            console.log('pageSize ' + pageSize);
            console.log('requestedPageNumber-1) * pageSize ' + (requestedPageNumber - 1) * pageSize);
            console.log('requestedPageNumber * pageSize ' + requestedPageNumber * pageSize);
            //debugger;
            console.log('rowstodisplay ' + rowstodisplay);
            //debugger;
            if (!event.getParam('scrollUp')) {
                rowstodisplay = recordsInCache.slice((requestedPageNumber - 1) * pageSize, requestedPageNumber * pageSize);
                var rows = tableCmp.get('v.rows');
                var rowsSliced = rows.slice(pageSize);
                console.log('@@@@  rowsSliced' + rowsSliced);
                console.log('@@@@  rowsSliced.concat(rowstodisplay)' + rowsSliced.concat(rowstodisplay));
                tableCmp.set('v.rows', (rowsSliced.concat(rowstodisplay)));
            } else {
                rowstodisplay = recordsInCache.slice((requestedPageNumber - 10) * pageSize, requestedPageNumber * pageSize);
                var rows = tableCmp.get('v.rows');
                tableCmp.set('v.rows', rowstodisplay);
            }
            
            //debugger; 
        }; 
        
        /**check if we need to replenish the cache pre-emptively by making a server call **/
         if (Object.keys(recordsInCache).length > 0 && requestedPageNumber <= totalPagesinCache && (totalPagesinCache - requestedPageNumber) == 10) {
          //debugger;
            console.log('Inside replnenish cache');
            this.callAction(component, 'c.getContacts', {
                'page': totalPagesinCache + 1,
                'pageSize': event.getParam('pageSize') * 10,
                'sortCol': tableCmp.get('v.sortColumnName'),
                'sortDir': tableCmp.get('v.sortDirection')

            }, function(data) {
                component.set('v.cachedrows', recordsInCache.concat(data));
                recordsInCache = data;
            }); 
        }; 
        // Set div height for rows outside viewport
       this.hideSpinner(component); 
    },
    flushCache:function(component, errors){
      component.set('v.cachedrows', []);
    
    },

    logActionErrors: function(component, errors) {
        if (errors) {
            for (var index in errors) {
                console.error('Error: ' + errors[index].message);
            }
        } else {
            console.error('Unknown error');
        }
    }
})