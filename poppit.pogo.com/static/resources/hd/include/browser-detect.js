$(document).ready(function() {
	// Figure out what browser is being used
	jQuery.browser = getBrowserInfo();
	if ($.browser.chrome || ($.query != null && $.query.get('skipBrowserCheck'))) {
		$("#gamePanel").css("display","block");
	} else {
		$("#gamePanel").css("display","block");
	};
});




function getBrowserInfo() {
	var userAgent = navigator.userAgent.toLowerCase();
	
	var browserInfo = {
			version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
			chrome: /chrome/.test( userAgent ),
			safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
			opera: /opera/.test( userAgent ),
			msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
			mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )	
	};
	return browserInfo;
}
