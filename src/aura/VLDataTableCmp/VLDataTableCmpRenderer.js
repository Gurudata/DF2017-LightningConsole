({
    afterRender: function(component, helper) {
        this.superAfterRender();
        // this is done in renderer because we don't get
        // access to the window element in the helper js.
        // per John Resig, we should not take action on every scroll event
        // as that has poor performance but rather we should take action periodically.
        // http://ejohn.org/blog/learning-from-twitter/
        var didScroll = false;
        window.onscroll = function() {
            didScroll = true;
        };
        // periodically attach the scroll event listener
        // so that we aren't taking action for all events
        var scrollCheckIntervalId = setInterval($A.getCallback(function() {
            // since this function is called asynchronously outside the component's lifecycle
            // we need to check if the component still exists before trying to do anything else
            if (didScroll && component.isValid()) {
                didScroll = false;
                // adapted from stackoverflow to detect when user has scrolled sufficiently to end of document
                // http://stackoverflow.com/questions/4841585/alternatives-to-jquery-endless-scrolling
                console.log('document.body.scrollTop' + document.body.scrollTop);
                console.log('document.body[scrollHeight]', +document.body['scrollHeight']);
                console.log('window[outerHeight]', +window['outerHeight']);
                console.log('window[scrollY]', +window['scrollY']);
                console.log('document.body[scrollHeight] - window[outerHeight] - 150', +document.body['scrollHeight'] - window['outerHeight'] - 100);
                if (window['scrollY'] >= document.body['scrollHeight'] - window['outerHeight'] - 100) {
                    
                    helper.getNextPage(component);
                }
                if (window['scrollY'] == 0) {
                    //helper.getNextPage(component);
                    
                    helper.getPreviousPage(component);
                }
                
                // Calculate and set row height.
                /*if (!$A.util.isUndefinedOrNull(document.getElementsByClassName("slds-hint-parent")[0].offsetHeight)) {
                    debugger;
                    var rowHeight = document.getElementsByClassName("slds-hint-parent")[0].offsetHeight;
                    component.set('v.rowHeight', rowHeight);
                    console.log('@@@@ rowHeight ' + rowHeight);
                    debugger;
                } */
                
                // Expand Contract the top filler div

                /*if (!$A.util.isUndefinedOrNull(document.getElementById("topFillerdiv"))) {
                    let coords = document.getElementById("topFillerdiv").getBoundingClientRect();
                    console.log('@@@@ coords.top ' + coords.top);
                    console.log('@@@@ coords.botom ' + coords.bottom);
                    if (!$A.util.isUndefinedOrNull(coords.bottom) && coords.bottom > -100) {
                        debugger;
                        console.log('Inside top filer threshold');
                        console.log('@@@@ coords.botom ' + coords.bottom);
                        debugger;
                        // helper.getPreviousPage(component);
                    }
                } */
                // Expand Contract the bottom filler div
                /*if (!$A.util.isUndefinedOrNull(document.getElementById("bottomFillerdiv"))) {
                    let coordsBottom = document.getElementById("bottomFillerdiv").getBoundingClientRect();
                    console.log('@@@@ coordsBottom.top ' + coordsBottom.top);
                    console.log('@@@@ coordsBottom.botom ' + coordsBottom.bottom);
                    if ((coordsBottom.top - window['outerHeight']) < 400) {
                        debugger;
                        console.log('Inside bottom filer threshold');
                        console.log('@@@@ coordsBottom.top ' + coordsBottom.top);
                        debugger;
                        //helper.getNextPage(component);
                    }
                } */
            }
        }), 4000);
        /*var options = {
            root: document.querySelector('#scrollArea'),
            rootMargin: '0px',
            threshold: 1.0
        }
        var observer = new IntersectionObserver(callback, options);
        var callback = function(entries, observer) {
            entries.forEach(entry => {
                // Each entry describes an intersection change for one observed
                // target element.
            });
        }; */
    },
    unrender: function(component, helper) {
        this.superUnrender();
        var scrollCheckIntervalId = component.get('v.scrollCheckIntervalId');
        if (!$A.util.isUndefinedOrNull(scrollCheckIntervalId)) {
            window.clearInterval(scrollCheckIntervalId);
        }
    }
})