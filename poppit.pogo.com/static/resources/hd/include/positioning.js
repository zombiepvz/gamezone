$(document).ready(function () {
	 $(window).resize(function(){
			// resize mask to cover browser window
			var maskHeight = $(document).height();
			var maskWidth = $(window).width();
			$('#mask').css({'width':maskWidth,'height':maskHeight});
			// center position gamepanel div
			
			$('#bannerDiv').css({
				   position:'absolute',
				   left: ($(window).width() - 728)/2,
				   top: '10px'
				  });
		  
		  
		  $('#gamePanel').css({
			   position:'absolute',
			   left: ($(window).width() - $('#gamePanel').outerWidth())/2,
			   top: '112px'
			  });
		  
		  $('#skyDiv').css({
			   position:'absolute',
			   left: $('#gamePanel').offset().left + 819 + 13,
			   top: '120px'
			  });
		
			// center position non chrome dialog
		  $('#notChrome').css({
			  position:'absolute',
			  left: ($(window).width() - $('#notChrome').outerWidth())/2,
			  top: ($(window).height() - $('#notChrome').outerHeight())/2
		  });
		  
		  
	  
	});
	$(window).resize();
});

