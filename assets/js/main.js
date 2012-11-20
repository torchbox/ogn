$(function () {
  
  var isDownload = new RegExp("\\.(7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|key|mp(2|3|4|e?g)|mov(ie)?|msi|msp|odp|pdf|phps|png|pps|ppt?x||ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip)$", "i");

  // enable resizing of main event number
  $(".header .event-number").fitText(0.45, { minFontSize: '96px', maxFontSize: '300px' });

  // set up for faux ajax infinate scroll. Hide all the rows but the first.
  $('#past-events .row').hide().first().show();
  
  $(document).scroll(function () { 
    // Where the top of the viewport is
    var scrollPos = document.body.scrollTop;
    // Height of the window viewport
    var winHeight = $(window).height();
    // Where the last element that's visible. 
    var scrollTarget = $('#past-events .row:visible').last();
    // Find out next element to show 
    var scrollTargetNext = $(scrollTarget).next('#past-events .row');    
    // Find out where the top of the above element is to create a trigger height
    var showTrigger = $(scrollTarget).offset().top;
    var showTrigger = Math.round(showTrigger);
    // Find out where the bottom of the viewport is. 
    var winBottom = winHeight + scrollPos;
    if ( winBottom > showTrigger ) {
      // Show the next element after the scrollTarget
      $(scrollTargetNext).delay(400).fadeIn(2500);
    }     
  });

  // track all outbound links
  $(document).on('click', function(event) {
    $(event.target).closest("a,area").each(function() {
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

      if (isInternal.test(this.href)) {
        if (isDownload.test(this.href)) {
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
          console.log('got here');
        }
      }else{
        event.preventDefault();
        _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
        // open all outbound links in a new window/tab
        window.open(this.href);
      }
    });
  });
  

 $('#guessdownload').each(function(){
    var filename404 = location.pathname.substr(location.pathname.lastIndexOf("/")+1,location.pathname.length);
    var thelink = $(this).find('.link-fat');
    if (isDownload.test(filename404)) {
      thelink.attr("href", thelink.attr("href") + filename404);
      $(this).show();
    }   
  });
});