var bannerTimer;
var skyTimer;
//var currentSkyFrameOffsetLeft;
$(document).ready(function () {
    refreshBanner();
    refreshSkyscrapper();
});

function refreshBanner() {

    if(!isWindowMinimized()) {
        var iframe = document.getElementById("bannerFrame");
        iframe.setAttribute("src","Banner.html")
    }

}

function refreshSkyscrapper() {
    if(!isWindowMinimized()) {
        var iframe = document.getElementById("skyFrame");
        iframe.setAttribute("src","Sky.html")
    }

}

// following section detecting if browser is minimized
function isWindowMinimized() {
    if((window.screenLeft&&window.screenLeft==-32000)||(window.screenX&&window.screenX==-32000)) {
        return true;
    }else {
        return false;
    }
}

function getTrackingNoChromeScript() {
    var ord1 = Math.floor(1000000 * Math.random());
    var ord2 = Math.floor(1000000 * Math.random());
    var htmlString = "<A HREF=\"http://ad.doubleclick.net/jump/N5295.4096.POGO.COM/B6470031.2;sz=1x1;ord=" + ord1 + "?\">"
        + "<IMG SRC=\"http://ad.doubleclick.net/ad/N5295.4096.POGO.COM/B6470031.2;sz=1x1;ord=" + ord2 + "?\" BORDER=0 WIDTH=1 HEIGHT=1 ALT=\"Advertisement\">"
        + "</A>";
    if(!isChromeBrowser()) {
        document.write(htmlString);
    }
}

function isGoodBrowser() {
    return isChromeBrowser();
}

function isChromeBrowser() {
    var browserInfo = getBrowserInfo();
    if(browserInfo.chrome) {
        return true;
    }else {
        return false;
    }
}