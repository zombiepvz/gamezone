ig.module(
    'game.gui.powerupButton'
)

.requires(
    'game.guiBase.button'
)

.defines(function()
{    
    EntityPowerupButton = EntityButton.extend
    ({   
        powerupSheet: new ig.AnimationSheet('media/images/balloons/powerups.png', 23, 27),
        anvilAnim: null,
        pinAnim: null,
        
        anvilCount: 0,
        pinCount: 0,
        
        activeCount: 0,
        activeAnim: null,
        
        xOffset: 0,
        yOffset: 4,
        
        powerupSpriteWidth: 23,

        init: function( x, y, settings )
        {            
            this.parent( x, y, settings );
            
            this.anvilAnim = new ig.Animation( this.powerupSheet, 0.1, [EntityPowerupItem.POWERUP.ANVIL]);
            this.pinAnim = new ig.Animation( this.powerupSheet, 0.1, [EntityPowerupItem.POWERUP.PIN]);
        },
        
        refreshButton: function()
        {
            this.activeCount = 0;
            this.activeAnim = null;
            
            if (this.anvilCount > 0)
            {
                this.activeCount = this.anvilCount;
                this.activeAnim = this.anvilAnim;
            }
            else if (this.pinCount > 0)
            {
                this.activeCount = this.pinCount;
                this.activeAnim = this.pinAnim;
            }
            else
                return;
            
            this.xOffset = (this.size.x/2);
            this.xOffset *= 1/this.activeCount;
            this.xOffset -= this.powerupSpriteWidth/2;
        },
        
        reset: function()
        {
            this.anvilCount = 0;
            this.pinCount = 0;
            
            this.refreshButton();
        },
        
        setPinCount: function(count)
        {
            this.pinCount = count;
            this.refreshButton();
        },
        
        addPin: function()
        {
            this.pinCount++;
            this.refreshButton();
        },
        
        removePin: function()
        {
            this.pinCount--;
            this.refreshButton();
        },
        
        setAnvilCount: function(count)
        {
            this.anvilCount = count;
            this.refreshButton();
        },
        
        addAnvil: function()
        {
            this.anvilCount++;
            this.refreshButton();
        },
        
        removeAnvil: function()
        {
            this.anvilCount--;
            this.refreshButton();
        },
        
        update: function()
        {
            this.parent();
            
            var active = this.activeCount != 0;
            if (this.active != active)
                this.setActive(active);
        },
        
        draw: function()
        {
            this.parent();

            for (var i = 0; i < this.activeCount; i++)
                this.activeAnim.draw(this.pos.x + this.xOffset + (this.powerupSpriteWidth * i), this.pos.y + this.yOffset);
        }
    });
});