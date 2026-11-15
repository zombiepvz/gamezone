ig.module(
	'game.fonts.bmFontImage'
)

.requires(
    'impact.image'
)

.defines(function()
{

    BMFontImage = ig.Image.extend
    ({
    	init: function( path, loadCallback )
    	{
    		this.path = path;
    		this.load(loadCallback);
    	},
    	
    	drawTile: function( targetX, targetY, x, y, tileWidth, tileHeight, flipX, flipY ) {
    		tileHeight = tileHeight ? tileHeight : tileWidth;
                		
    		if( !this.loaded || tileWidth > this.width || tileHeight > this.height ) { return; }

    		var scale = ig.system.scale;
    		var tileWidthScaled = Math.floor(tileWidth * scale);
    		var tileHeightScaled = Math.floor(tileHeight * scale);

    		var scaleX = flipX ? -1 : 1;
    		var scaleY = flipY ? -1 : 1;

    		if (tileWidthScaled <= 0 || tileHeightScaled <= 0)
    		    return;
    		    
    		if( flipX || flipY )
    		{
    			ig.system.context.save();
    			ig.system.context.scale( scaleX, scaleY );
    		}
    		
    		ig.system.context.drawImage( 
    			this.data, 
    			Math.floor(x * scale),
    			Math.floor(y * scale),
    			tileWidthScaled,
    			tileHeightScaled,
    			ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0), 
   			    ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0),
    			tileWidthScaled,
    			tileHeightScaled
    		);
    		
    		if( flipX || flipY )
    			ig.system.context.restore();

    		ig.Image.drawCount++;
    	}
    });

});