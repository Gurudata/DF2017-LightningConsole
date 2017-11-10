<aura:application extends="force:slds" controller="VLDataTableDemoAppController">

    <!-- public attributes -->
    
    <!-- private attributes -->
    <aura:attribute name="cachedrows"
                    type="Object[]"
                    description="All rows accesded from the server" access="private"/>
    <aura:attribute name="rowstodisplay"
                    type="Object[]"
                    description="Rows to be dislayed" access="private"/> 
    <aura:attribute name="currentPageNumber"
                    type="Integer"
                    description="Page Number been displayed" access="private"/>
    <aura:attribute name="totalPagesInCache"
                    type="Integer"
                    description="total pages to display" access="private"/>
    <aura:attribute name="replenishCacheTreshold"
                    type="Integer"
                    default="2"                    
                    description="The residual unaccessed pages in cache which would trigger a replenish call to fetch more rows from server" 
                    access="private"/>              

    <aura:attribute name="topDivheight" 
                    default="0px" 
                    type="String" 
                    access="private"/> 
   
    <aura:attribute name="bottomDivheight" 
                     default="0px" 
                     type="String" 
                     access="private"/> 
    <!-- events -->
    <aura:handler name="pageChangeEvent" event="c:VDataTablePageChangeEvent" action="{!c.handlePageChangeEvent}" phase="capture"/>
    <!--<aura:handler name="sortChangeEvent" event="c:VLDataTableSortChangeEvent" action="{!c.handleSortChangeEvent}" /> -->
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
   <aura:handler event="c:VLDataTableSortChangeEvent" action="{!c.handleSortChangeEvent}"/>
    <!-- markup -->
    <c:VLDataTableCmp aura:id="dataTable">
        <aura:set attribute="columns">

            <c:VLDataTableColumnCmp label="Contact ID"
                                  name="Id"
                                  linkToRecord="Id"
                                  sortable="true"/>

            <c:VLDataTableColumnCmp label="First Name"
                                  name="FirstName"
                                  linkToRecord="Id"
                                  sortable="true"/>

            <c:VLDataTableColumnCmp label="Last Name"
                                  name="LastName"
                                  linkToRecord="Id"
                                  sortable="true"/>

            <c:VLDataTableColumnCmp label="Account Name"
                                  name="Account.Name"
                                  linkToRecord="Account.Id"
                                  sortable="true"/>

          
           

           

        </aura:set>
       
        <!-- optional -->

        <aura:set attribute="pageNumber" value="1"/>
        <aura:set attribute="pageSize" value="5"/>
        <aura:set attribute="sortColumnName" value="Name"/>
        <aura:set attribute="sortDirection" value="desc"/>

    </c:VLDataTableCmp>
     <lightning:spinner aura:id="spinner" variant="brand"/>
 
</aura:application>