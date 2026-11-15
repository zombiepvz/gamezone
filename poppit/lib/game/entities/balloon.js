ig.module(
    'game.entities.balloon'
)

.requires(
    'game.entities.extendedEntity'
)

.defines(function()
{    
    EntityBalloon = ExtendedEntity.extend
    ({        
        color: 0,
        state: 0,
                
        scaleOffset: {x: 0, y:0},
        idleScale: {x: 0.55, y:0.55},
        selectedScale: {x: 0.85, y: 0.75},

        animSheet: new ig.AnimationSheet( 'media/images/balloons/balloons.png', 54, 63 ),

        visited: false,
        focusInside: false,
        
        popTimer: 0,
        
        init: function( x, y, settings )
        {            
            this.parent( x, y, settings );
            this.setColor(this.color);
        },
        
        setColor: function(color)
        {
            this.color = color;
            if (this.color == EntityBalloon.COLORS.ANVIL)
            {
                this.anims = {};
                this.currentAnim = null;
                return;
            }
            this.anims = {};
            this.addAnim( 'idle', 0.1, [this.color + EntityBalloon.STATES.IDLE] );
            this.addAnim( 'pinch', 0.1, [this.color + EntityBalloon.STATES.SELECTED] );
            this.addAnim( 'pop', 0.1, [this.color + EntityBalloon.STATES.POPPED] );
            this.currentAnim = this.anims["idle"];
            this.size.x = this.currentAnim.sheet.width;
            this.size.y = this.currentAnim.sheet.height;
            this.deselect();
        },
        
        setScale: function(x, y)
        {
            this.parent(x, y);
        },
        
        setPos: function(pos)
        {
            this.parent(pos);
            this.pos.x -= this.scaleOffset.x;
            this.pos.y -= this.scaleOffset.y;
        },
                
        deselect: function()
        {
            if (this.state != EntityBalloon.STATES.POPPED)
            {
                this.state = EntityBalloon.STATES.IDLE;
                this.setScale(this.idleScale.x, this.idleScale.y);
                this.currentAnim = this.anims["idle"];
                this.zIndex = 0;
                ig.game.sortEntitiesDeferred();
                this.scaleOffset = {x: 0, y:0};
                if (this.currentAnim)
                {
                    this.size.x = this.currentAnim.sheet.width * this.scale.x;
                    this.size.y = this.currentAnim.sheet.height * this.scale.y;
                }
            }
        },
        
        select: function()
        {
            var size = {}
            size.x = this.size.x;
            size.y = this.size.y;
            this.state = EntityBalloon.STATES.SELECTED;
            this.setScale(this.selectedScale.x, this.selectedScale.y);
            this.currentAnim = this.anims["pinch"];            
            this.zIndex = 1;
            ig.game.sortEntitiesDeferred();
            this.size.x = this.currentAnim.sheet.width * this.scale.x;
            this.size.y = this.currentAnim.sheet.height * this.scale.y;
            if (this.size.x != size.x )
            {
                var scale = ig.system.scale;
                var offset = {};
                offset.x = (this.size.x - size.x) / 2;
                offset.y = (this.size.y - size.y) / 2;
                this.scaleOffset = offset;
            }
        },
        
        pop: function()
        {
            this.state = EntityBalloon.STATES.POPPED;
            this.popTimer = 0.15;
            this.currentAnim = this.anims["pop"];
        },
        
        update: function()
        {
            this.parent();
            if (this.state == EntityBalloon.STATES.POPPED)
            {
                this.popTimer -= ig.system.tick;
                if (this.popTimer <= 0) this.kill();
            }
        },

        containsPoint: function(x, y)
        {
            if (this.color == EntityBalloon.COLORS.ANVIL) return false;
            return this.parent(x, y);
        }
    });
    
    EntityBalloon.COLORS =
    {
        ANVIL: -1,
        BLUE: 0,
        GREEN: 3,
        ORANGE: 6,
        PURPLE: 9,
        RED: 12
    };
    
    EntityBalloon.COLORS.keys = function()
    {
        var keys = [];
        for (key in EntityBalloon.COLORS) keys.push(key);
        return key;
    };

    EntityBalloon.STATES =
    {
        IDLE: 0,
        SELECTED: 1,
        POPPED: 2
    };
        
});