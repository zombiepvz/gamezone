ig.module(
    'game.entities.balloonItem'
)

.requires(
    'game.entities.extendedEntity'
)

.defines(function()
{    
    EntityBalloonItem = ExtendedEntity.extend
    ({        
        state: 0,
	    itemType: -1,
    	animSheet: new ig.AnimationSheet('media/images/balloons/balloonitems.png', 54, 63),
        cell: null,
        init: function(x, y, settings)
        {            
            var scale = ig.system.scale;
            this.offset.x = 8 * scale;
            this.offset.y = 14 * scale;
    		this.parent(x, y, settings);
    		this.addAnim("powerup", 0.1, [0]);
    		this.addAnim("prize", 0.1, [1]);
    		this.setScale(0.8, 0.8);
    		this.zIndex = 2;
        },
        RestartAnimation: function()
        {
            // abstract placeholder
        }

    });
    
    EntityBalloonItem.TYPE =
    {
        PRIZE: 1,
        POWERUP: 2
    };
    
    EntityBalloonItem.STATES =
    {
        ALIVE: 0,
        DEAD: 1
    };
        
});