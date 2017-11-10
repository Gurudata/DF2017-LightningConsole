({
    doInit: function( component, event, helper ) {

    },
   
   handlePageChangeEvent : function( component, event, helper ) {
    var tableCmp = component.find( 'dataTable' );    
    console.log( 'handling page change event in app container' );
    console.log( 'columnName=' + tableCmp.get( 'v.sortColumnName' ) );
    console.log( 'sortDirection=' + tableCmp.get( 'v.sortDirection' ) );
    console.log( 'page=' + event.getParam( 'pageNumber' ) );
    console.log( 'pageSize=' + event.getParam( 'pageSize' ) );

    helper.fetchPagefromCache(component, event, 'handlePageChangeEvent');

   },

    handleSortChangeEvent : function( component, event, helper ) {
        var tableCmp = component.find( 'dataTable' );
        tableCmp.set( 'v.pageNumber', 1 );

        tableCmp.set( 'v.sortDirection', event.getParam( 'sortDirection'));
        tableCmp.set( 'v.sortColumnName ', event.getParam( 'columnName' ));
     
        console.log( 'handling sort event in app container' );
        console.log( 'columnName=' + event.getParam( 'columnName' ) );
        console.log( 'sortDirection=' + event.getParam( 'sortDirection' ) );
        console.log( 'pageNumber=' + tableCmp.get( 'v.pageNumber' ) );
        console.log( 'pageSize=' + tableCmp.get( 'v.pageSize' ) );
        
        //flush cache when sorting happens
        helper.flushCache (component, event);
        helper.fetchPagefromCache(component, event, 'handleSortChangeEvent');
    }
    
})