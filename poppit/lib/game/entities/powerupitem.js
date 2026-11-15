ig.module(
    'game.entities.powerupitem'
)

.requires(
    'game.entities.balloonItem'
)

.defines(function()
{    
    EntityPowerupItem = EntityBalloonItem.extend
    ({        
        itemType: EntityBalloonItem.TYPE.POWERUP,
        powerupType: 0,
        
        init: function( x, y, settings )
        {            
    		this.parent( x, y, settings );
            
            this.currentAnim = this.anims["powerup"];
        },
        
        RestartAnimation: function()
        {
            this.currentAnim = this.anims["powerup"];
        }
    });
    
    EntityPowerupItem.POWERUP =
    {
        ANVIL: 0,
        PIN: 1
    };        
});