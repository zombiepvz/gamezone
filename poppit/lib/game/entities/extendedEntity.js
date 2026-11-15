/*
 * Original
 * Scale Individual Entities Plugin
 * Written By Abraham Walters
 * June 2012
 *
 * Modified
 * Jet Set Games, Inc.
 * 2013
 */
// https://github.com/quidmonkey/Scale-Individual-Entities-Plugin

ig.module(
    'game.entities.extendedEntity'
)
.requires(
    'impact.entity'
)

.defines(function()
{        
    ExtendedEntity = ig.Entity.extend
    ({
        scale: { x: 1, y: 1 },		//user-defined scale
    	_offset: { x: 0, y: 0 },	//cached offset prior to scaling
    	_scale: { x: 1, y: 1 },		//scale relative to ig.system.scale
    	_size: { x: 0, y: 0 },		//cached size prior to scaling

    	init: function( x, y, settings ){
    		this.parent( x, y, settings );
    		this._offset.x = this.offset.x;
    		this._offset.y = this.offset.y;
    		this._size.x = this.size.x;
    		this._size.y = this.size.y;
    		this.setScale( this.scale.x, this.scale.y );
    	},
    	
        setPos: function(pos)
        {
            this.pos.x = pos.x;
            this.pos.y = pos.y;
        },
    
        getCollisionRect: function()
        {
            var rect = 
            {
    			left: this.pos.x,
    			top: this.pos.y,
    			right: this.pos.x + this.size.x * ig.system.scale,
    			bottom: this.pos.y + this.size.y * ig.system.scale
    		};
				
    		return rect;
        },
    
        intersectRect: function (r1, r2)
        {
            return !(r2.left > r1.right || 
                     r2.right < r1.left || 
                     r2.top > r1.bottom ||
                     r2.bottom < r1.top);
        },
    
        collidesWithEntity: function(entity)
        {
            var rect1 = this.getCollisionRect();
            var rect2 = entity.getCollisionRect();
        
            return this.intersectRect(rect1, rect2);
        },
    
    	containsPoint: function(x, y)
        { 	        
            return ( (this.pos.x <= (x + ig.game.screen.x)) &&
                     ((x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
                     (this.pos.y <= (y + ig.game.screen.y)) &&
                     ((y + ig.game.screen.y) <= this.pos.y + this.size.y)
            );
         },
         
         draw: function()
         {
     	    if( this.currentAnim ) 
     	    {
     	        var scale = ig.system.scale;
     		    var ctx = ig.system.context;
         		ctx.save();
         		ctx.translate(
         			ig.system.getDrawPos( this.pos.x.round() - this.offset.x - ig.game.screen.x ),
         			ig.system.getDrawPos( this.pos.y.round() - this.offset.y - ig.game.screen.y )
         		);
         		ctx.scale( this._scale.x * scale, this._scale.y * scale );
         		this.currentAnim.draw( 0, 0 );
         		ctx.restore();
     		}
     		
    		if( ig.Entity._debugShowBoxes) {
    			ig.system.context.strokeStyle = this.colors.boxes;
    			ig.system.context.lineWidth = 1.0;
    			ig.system.context.strokeRect(	
    				ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x) - 0.5,
    				ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y) - 0.5,
    				this.size.x * ig.system.scale,
    				this.size.y * ig.system.scale
    			);
    		}
     	},
        
        setScaleVec: function(scale)
        {
            this.setScale(scale.x, scale.y);
        },
        
     	setScale: function( x, y )
     	{
     		//cache size prior to scaling
     		var oX = this.size.x;
     		var	oY = this.size.y;

     		//set scale
     		this.scale.x = x || this.scale.x;
     		this.scale.y = y || this.scale.y;

     		//set scale relative to game scale
     		this._scale.x = this.scale.x / ig.system.scale;
     		this._scale.y = this.scale.y / ig.system.scale;

     		//scale offset
     		this.offset.x = this._offset.x * this._scale.x;
     		this.offset.y = this._offset.y * this._scale.y;

     		//scale size
     		this.size.x = this._size.x * this._scale.x;
     		this.size.y = this._size.y * this._scale.y;

     		//offset entity's position by the change in size
     		this.pos.x += (oX - this.size.x) / 2;
     		this.pos.y += (oY - this.size.y) / 2; 
     	}
    });
 
});