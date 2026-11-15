ig.module(
    'game.utils.utils'
)

.requires(
    'impact.impact'
)

.defines(function()
{    
    Utils = ig.Class.extend({});
    
    // Note: All random functions in Utils are noninclusive.
    
    // [0 - max)
    Utils.random = function( max )
    {
        return Math.floor(Math.random() * max);
    };
    
    // [min - max)
    Utils.randomRange = function(min, max)
    {
        return Math.floor(Math.random() * (max - min) + min);
    };
    
    Utils.getRandomValueFromRangeTable = function(table)
    {
        var rand = Utils.randomRange(table[0], table[1] + 1);
        return rand;
    };
    
    Utils.getRandomIndexFromProbabilityTable = function(table)
    {
        var index = 0;
        var rand = Utils.random(100) + 1;
        
        var curProbability = 0;
        for (var i in table)
        {
            curProbability += table[i];
            
            if (rand <= curProbability)
            {
                index = i;
                break;
            }
        }
        
        return index;
    };
    
    Utils.getRandomElementFromTableAndRemove = function(table)
    {
        var randIndex = Utils.random(table.length);
        var randElement = table[randIndex];
        
        table.splice(randIndex, 1);
        
        return randElement
    };
    
    Utils.getRootPath = function(path)
    {
        var pathSplit = path.split("/");
        pathSplit.splice(pathSplit.length-1, 1);
        
        return pathSplit.join("/") + "/";
    };
    
    Utils.getValueFromString = function(string)
    {
        var value = parseInt(string);
        
        if (!value)
        {
            var stringList = string.split("\"");
            var vectorList = string.split(",");
            
            if (stringList.length > 1)
                value = stringList[1];
            else if (vectorList.length > 1)
                value = vectorList
        }   
        return value;
    },
    
    Utils.getBinaryFile = function(strURL, callbackDelegate, bBypassCache) 
    {
        var XMLHttp = null;
        var XMLHttpStateChanged = function() 
        {
            if (XMLHttp.readyState == 4) 
            {
                var objResponse = {};
                if (XMLHttp.status == "304" || XMLHttp.status == "200" || 
                    XMLHttp.status == "206" || XMLHttp.status == "0") 
                {
                    objResponse.Content = 
                        typeof XMLHttp.responseBody == 'unknown' ? 
                        XMLHttp.responseBody : 
                        XMLHttp.responseText;
                    objResponse.HTTPStatus = 
                        XMLHttp.status;
                    objResponse.ContentLength = 
                        XMLHttp.getResponseHeader("Content-Length");
                    objResponse.ContentType = 
                        XMLHttp.getResponseHeader("Content-Type");
                    objResponse.url = strURL;
                }
                XMLHttp = null;
                callbackDelegate.binaryFileLoaded(objResponse);
            }
        }

        if (window.XMLHttpRequest) 
        {
            XMLHttp = new XMLHttpRequest();
        } 
        else if (window.ActiveXObject) 
        {
            try 
            {
                XMLHttp = new ActiveXObject('MSXML2.XMLHttp.3.0');
            } 
            catch(ex) 
            {
                XMLHttp = null;
            }
        }

        if (XMLHttp) 
        {
            if (callbackDelegate.binaryFileLoaded) 
            {
                if (typeof(XMLHttp.onload) != 'undefined') 
                {
                    XMLHttp.onload = XMLHttpStateChanged;
                } 
                else 
                {
                    XMLHttp.onreadystatechange = XMLHttpStateChanged;
                }
            }

            XMLHttp.open("GET", strURL, true);

            if (XMLHttp.overrideMimeType) 
                XMLHttp.overrideMimeType('text/plain; charset=x-user-defined');

            if(typeof(bBypassCache) != 'undefined') 
            {
                if (bBypassCache == true) 
                    XMLHttp.setRequestHeader(
                        'If-Modified-Since', 
                        'Sat, 1 Jan 1970 00:00:00 GMT'
                    );
            }

            XMLHttp.send(null);
        } 
        else 
        {
            if (callbackDelegate.binaryFileLoaded) callbackDelegate.binaryFileLoaded();
        }
    };
});



