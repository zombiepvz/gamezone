ig.module(
    'game.guiBase.button'
)

.requires(
    'game.entities.extendedEntity'
)

.defines(function()
{    
    EntityButton = ExtendedEntity.extend
    ({   
        active: true,
        state: 0,
        
        toggle: false,
        toggled: false,
        
        clickSound: new ig.Sound('media/sounds/MenuClick.*'),

        init: function( x, y, settings )
        {            
            this.parent( x, y, settings );
                        
            this.zIndex = 5;
            ig.game.sortEntitiesDeferred();
        },
        
        setAnimSheet: function(animSheet, normalStateIndex)
        {
            this.animSheet = animSheet;
            
            this.addAnim( 'normal', 0.1, [normalStateIndex + EntityButton.STATES.NORMAL] );
            this.addAnim( 'selected', 0.1, [normalStateIndex + EntityButton.STATES.SELECTED] );
            
            this.deselect();
        },
        
        setActive: function(active)
        {
            this.toggled = false;
            this.active = active;
            
            if (active)
                this.deselect();
            else
                this.currentAnim = null;
        },
        
        deselect: function()
        {            
            if (!this.active) return;
            
            this.state = EntityBalloon.STATES.IDLE;
            this.currentAnim = this.anims["normal"];
        },

        select: function()
        {
            if (!this.active) return;
            
            this.state = EntityBalloon.STATES.SELECTED;
            this.currentAnim = this.anims["selected"];
        },
        
        trigger: function()
        {
            this.clickSound.play();
            
            if (this.onTrigger)
                this.onTrigger(this);
        },
        
        setToggled: function(toggled)
        {            
            this.toggled = toggled;
            
            if (!this.toggled)
                this.deselect();
            else
                this.select();
        },
        
        clickDown: function(pos)
        {
            var capture = this.containsPoint(pos.x, pos.y);
            
            if (capture)
                this.select();
            
            return capture;
        },
        
        clickUp: function(pos)
        {
            var capture = this.containsPoint(pos.x, pos.y);
            
            if (capture && this.active)
            {
                if (this.toggle)
                    this.toggled = !this.toggled;

                this.trigger();
            }
            
            if (!this.toggled)
                this.deselect();
        },
        
        clickMoved: function(pos)
        {
            if (!this.containsPoint(pos.x, pos.y))
                this.deselect();
            else
                this.select()
        },
        
        containsPoint: function(x, y)
        {
            if (!this.active) return false;
            
            return this.parent(x, y);
        }
    });

    EntityButton.STATES =
    {
        NORMAL: 0,
        SELECTED: 1
    };
});