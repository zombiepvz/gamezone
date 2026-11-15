ig.module(
    'game.entities.spike'
)

.requires(
    'game.entities.extendedEntity',
    
    'game.utils.utils'
)

.defines(function()
{    
    EntitySpike = ExtendedEntity.extend
    ({        
        state: 0,
        
        mainPos: {x: 0, y:0},
        
        idleAnimSheet: new ig.AnimationSheet( 'media/images/spike/spike_neutral128x144.png', 128, 144 ),
        excitedAnimSheet: new ig.AnimationSheet( 'media/images/spike/spike_excited122x148.png', 122, 148 ),
        glanceAnimSheet: new ig.AnimationSheet( 'media/images/spike/spike_glance118x144.png', 118, 144 ),
        jumpsAnimSheet: new ig.AnimationSheet( 'media/images/spike/spike_jumps134x248.png', 134, 248 ),
        shrugsAnimSheet: new ig.AnimationSheet( 'media/images/spike/spike_shrugs120x144.png', 120, 144 ),
        winkAnimSheet: new ig.AnimationSheet( 'media/images/spike/spike_wink112x144.png', 112, 144 ),
        
        idleAnim: null,
        excitedAnim: null,
        glanceAnim: null,
        jumpsAnim: null,
        shrugsAnim: null,
        winkAnim: null,

        init: function( x, y, settings )
        {            
            this.parent( x, y, settings );
            
            this.idleAnim = new ig.Animation( this.idleAnimSheet, 0.1, [0] );
            this.excitedAnim = new ig.Animation( this.excitedAnimSheet, 0.1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] );
            this.glanceAnim = new ig.Animation( this.glanceAnimSheet, 0.1, [0,1,2,3,4,5] );
            this.jumpsAnim = new ig.Animation( this.jumpsAnimSheet, 0.1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] );
            this.shrugsAnim = new ig.Animation( this.shrugsAnimSheet, 0.1, [0,1,2,3,4,5,6,7,8,9,10] );
            this.winkAnim = new ig.Animation( this.winkAnimSheet, 0.1, [0,1,2,3,4,5,6] );
            
            this.setState(this.state);
            
            TouchHandler.instance.registerDelegate(this, 1);
        },
        
        setState: function(state)
        {
            this.state = state;
            switch(state)
            {
                case EntitySpike.STATES.IDLE:
                    this.currentAnim = this.idleAnim;
                    break;
                case EntitySpike.STATES.EXCITED:
                    this.currentAnim = this.excitedAnim;
                    break;
                case EntitySpike.STATES.GLANCE:
                    this.currentAnim = this.glanceAnim;
                    break;
                case EntitySpike.STATES.JUMPS:
                    this.currentAnim = this.jumpsAnim;
                    break;
                case EntitySpike.STATES.SHRUGS:
                    this.currentAnim = this.shrugsAnim;
                    break;
                case EntitySpike.STATES.WINK:
                    this.currentAnim = this.winkAnim;
                    break;
            }
            
            this.currentAnim.gotoFrame(0);
            
            this.size.x = this.currentAnim.sheet.width;
            this.size.y = this.currentAnim.sheet.height;
            
            this.pos.y = this.mainPos.y - (this.size.y);
            
            this.size.x -= 20;
            this.size.y -= 10;
        },
        
        setPos: function(pos)
        {
            this.parent(pos);
            
            this.mainPos.x = pos.x;
            this.mainPos.y = pos.y;
            
            this.setState(this.state);
        },
        
        /////////////////////
        // Updates
        /////////////////////
        clickDown: function(pos)
        {            
            return this.containsPoint(pos.x, pos.y);
        },
        
        clickUp: function(pos)
        {
            var capture = this.containsPoint(pos.x, pos.y);
            
            if (this.state == EntitySpike.STATES.IDLE && capture)
                this.setState(Utils.randomRange(1, EntitySpike.STATES.length));
        },
        
        update: function()
        {
            this.parent();
            
            if (this.state != EntitySpike.STATES.IDLE && this.currentAnim.frame == this.currentAnim.sequence.length - 1)
                this.setState(EntitySpike.STATES.IDLE);
        }
        
    });
    
    EntitySpike.STATES =
    {
        IDLE: 0,
        EXCITED: 1,
        GLANCE: 2,
        JUMPS: 3,
        SHRUGS: 4,
        WINK: 5,
        length: 6
    };
});