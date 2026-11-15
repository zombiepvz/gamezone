ig.module(
    'game.entities.prizeitem'
)

.requires(
    'game.entities.balloonItem'
)

.defines(function()
{    
    EntityPrizeItem = EntityBalloonItem.extend
    ({        
        itemType: EntityBalloonItem.TYPE.PRIZE,
        
        init: function( x, y, settings )
        {            
    		this.parent( x, y, settings );
            this.currentAnim = this.anims["prize"];
        },
        
        RestartAnimation: function()
        {
            this.currentAnim = this.anims["prize"];
        }
    });

});