({
    fireSortChangeEvent : function( component, event, helper ) {

        var sortable = component.get( 'v.sortable' );

        if ( sortable == true ) {

            var sortDirection = component.get( 'v.sortDirection' );

            if ( sortDirection === 'asc' ) {
                sortDirection = 'desc';
            } else {
                sortDirection = 'asc';
            }

          $A.get("e.c:VLDataTableSortChangeEvent").setParams({
                'columnLabel' : component.get( 'v.label' ),
                'columnName' : component.get( 'v.name' ),
                'sortDirection' : sortDirection,
                'pageNumber':1,
                'pageSize':5

            }).fire();

        }

    }
})