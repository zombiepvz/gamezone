ig.module(
    'game.utils.drawUtils'
)

.requires(
    'impact.impact'
)

.defines(function()
{    
    DrawUtils = ig.Class.extend({});
    
    DrawUtils.drawWrapString = function(ctx, text, x, y, lineSpacing, lineWidth)
    {
        var splitLines = text.split("\n");
        
        var curStringLen = 0;
        var curString = "";
        
        var lineCount = 0;
        
        for (var i = 0; i < splitLines.length; i++)
        {
            var splitString = splitLines[i].split(" ");
            for (var j = 0; j < splitString.length; j++)
            {
                var subString = splitString[j];
                subString += " ";
                
                var subStringLen = ctx.measureText(subString).width;
                if (subStringLen + curStringLen < lineWidth)
                {
                    curStringLen += subStringLen;
                    curString += subString;
                }
                else
                {
                    ctx.fillText( curString, x, y + (lineSpacing * lineCount) );
                    
                    lineCount++;
                    curStringLen = 0;
                    
                    curStringLen = subStringLen;
                    curString = subString;
                }
            }
            ctx.fillText(curString, x, y + (lineSpacing * lineCount));
            lineCount++;
        }
    };
});



