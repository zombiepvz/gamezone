ig.module(
    'game.entities.target'
)

.requires(
    'game.touchHandler',
    'game.entities.extendedEntity',
    
    'game.utils.utils'
)

.defines(function()
{    
    EntityTarget = ExtendedEntity.extend
    ({      
        size: {x: 67, y: 48},
        animSheet: new ig.AnimationSheet( 'media/images/prizes/target.png', 67, 48 ),
        
        clickOffset: {x: 0, y: 0},
        clickedDown: true,
        
        minX: 140,
        maxX: 410,
        
        staticInstantiate: function()
        {
            if(EntityTarget.instance == null)
                return null;
            else 
                return EntityTarget.instance;
        },

        init: function(x, y, settings) 
        {
            EntityTarget.instance = this;
            this.parent( x, y, settings );
            
            this.addAnim( 'target', 0.1, [0] );
            this.currentAnim = this.anims["target"];
            
            this.size.x = this.currentAnim.sheet.width;
            this.size.y = this.currentAnim.sheet.height;
            
            TouchHandler.instance.registerDelegate(this);
        },
        
        // 140, 410
        show: function()
        {
            if (!this.currentAnim)
            {
                this.setPos({x: Utils.randomRange(this.minX, this.maxX), y: 260});
                this.currentAnim = this.anims["target"];
            }
        },
        
        hide: function()
        {
            this.currentAnim = null;
        },
        
        clickDown: function(pos)
        {
            this.clickedDown = !!this.currentAnim && this.containsPoint(pos.x, pos.y);
            
            if (this.clickedDown)
            {
                this.clickOffset.x = this.pos.x - pos.x;
                this.clickOffset.y = this.pos.y - pos.y;
            }
            
            return this.clickedDown;
        },
        
        clickUp: function(pos)
        {
            this.clickedDown = false;
        },
        
        clickMoved: function(pos)
        {
            if (!this.clickedDown) return;
            
            var newX = pos.x + this.clickOffset.x;
            if (newX > this.minX && newX < this.maxX)
                this.pos.x = newX;
        }
    });
});