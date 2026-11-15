ig.module(
    'game.entities.prize'
)

.requires(
    'game.entities.extendedEntity',
    'game.entities.target',
    'game.entities.floatingText'
)

.defines(function()
{    
    EntityPrize = ExtendedEntity.extend
    ({  
        prizeType: -1,
        
        parachute: new ig.Image( 'media/images/prizes/parachute.png' ),
        animSheet: new ig.AnimationSheet( 'media/images/prizes/prizes.png', 34, 32 ),

        size: {x: 34, y: 32},

        prizeSpeed: 50,
        prizeLandingOffset: 75,
        falling: false,
        
        maxTimeOnGround: 1,
        timeOnGround: 0,
        
        accelerometerScale: 0.75,
        
        sounds: [
            new ig.Sound('media/sounds/PrizeMonkey.mp3'),
            new ig.Sound('media/sounds/PrizeJester.mp3'),
            new ig.Sound('media/sounds/PrizePizza.mp3'),
            new ig.Sound('media/sounds/PrizeSaxophone.mp3'),
            new ig.Sound('media/sounds/PrizeDice.mp3'),
            new ig.Sound('media/sounds/PrizePanda.mp3'),
            new ig.Sound('media/sounds/PrizeTank.mp3'),
            new ig.Sound('media/sounds/PrizeGhost.mp3'),
            new ig.Sound('media/sounds/PrizeBoat.mp3'),
            new ig.Sound('media/sounds/PrizePlane.mp3'),
            new ig.Sound('media/sounds/PrizeFish.mp3'),
            new ig.Sound('media/sounds/PrizeConch.mp3'),
            new ig.Sound('media/sounds/PrizeBaseball.mp3'),
            new ig.Sound('media/sounds/PrizePretzel.mp3'),
            new ig.Sound('media/sounds/PrizeCar.mp3'),
            new ig.Sound('media/sounds/PrizeBee.mp3'),
            new ig.Sound('media/sounds/PrizeFrog.mp3'),
            new ig.Sound('media/sounds/PrizeTaco.mp3'),
            new ig.Sound('media/sounds/PrizePuppy.mp3')
        ],
        
        targetSound: new ig.Sound('media/sounds/PoppitSFXCatchPrize.mp3'),
        groundSound: new ig.Sound('media/sounds/PoppitSFXPrizeChime.mp3'),

        init: function( x, y, settings )
        {
            this.parent( x, y, settings );
            ig.input.initAccelerometer();
            this.zIndex = 4;
            ig.game.sortEntitiesDeferred();
        },
        
        resetPrizeAnim: function()
        {
            this.anims = {};
            this.addAnim( "prize", 0.1, [this.prizeType] );
            this.currentAnim = this.anims["prize"];
            this.size.x = this.currentAnim.sheet.width;
            this.size.y = this.currentAnim.sheet.height;
        },
        
        setPrize: function(prizeNumber)
        {
            this.prizeType = prizeNumber;
            this.resetPrizeAnim();
            
            this.sounds[prizeNumber].play();
        },
        
        spawnFloatText: function(points)
        {
            this.spawnCounter++;
            this.floatingText = ig.game.spawnEntity(EntityFloatingText, this.pos.x, this.pos.y);
            this.floatingText.setText("+" + points.toString());
        },

        update: function()
        {
            this.parent();
            if (this.currentAnim)
            {
                if (this.falling && 
                    ((this.pos.x > 0 && ig.input.accel.y < 0) || 
                    (this.pos.x < ig.system.width - this.size.x && ig.input.accel.y > 0)))
                {
                    this.pos.x += ig.input.accel.y * this.accelerometerScale;
                }
                if (this.pos.y <= ig.system.height - this.prizeLandingOffset)
                {
                    this.pos.y += this.prizeSpeed * ig.system.tick;
                    this.falling = true;
                }
                else if (this.falling == true)
                {
                    this.falling = false;
                    var points = 0;
                    if (!ig.game.gameover)
                    {
                        if (this.collidesWithEntity(ig.game.target))
                        {
                            points = Player.instance.prizeHitTarget(this);
                            this.currentAnim = null;
                            this.targetSound.play();
                        }
                        else
                        {
                            points = Player.instance.prizeReleased(this);
                            this.groundSound.play();
                        }
                        this.spawnFloatText(points);
                    }
                }
                else
                {
                    if (this.timeOnGround < this.maxTimeOnGround) this.timeOnGround += ig.system.tick;
                    else this.currentAnim = null;
                }
            }
        },

        draw: function()
        {
            var scale = ig.system.scale;
            if (this.falling) this.parachute.draw(this.pos.x - ((this.parachute.width/2) - (this.size.x/2)), this.pos.y - this.size.y);
            this.parent();
        }
    });
    
});