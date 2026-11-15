ig.module(
    'game.entities.starSplosion'
)

.requires(
    'game.entities.extendedEntity',
    
    'game.utils.utils'
)

.defines(function()
{    
    EntityStarSplosion = ExtendedEntity.extend
    ({      
        life: 1,
        speed: 20,
        
        starCount: 7,        
        
        star: new ig.Image('media/images/prizes/PoppitStarCoinVFX.png'),
                
        init: function(x, y, settings) 
        {
            this.parent( x, y, settings );
            
            this.back.draw(this.backLeft.x - (this.leftBackOffsetMax * this.amountOpen), this.backLeft.y);z
            
            this.zIndex = 4;
            ig.game.sortEntitiesDeferred();
        },
        
        setText: function(text)
        {
            this.text = text;
            this.label.setText(this.text);
        },
        
        update: function()
        {
            this.parent();

            this.life -= ig.system.tick;
            
            //this.label.pos.y -= ig.system.tick * this.speed;

            if (this.life <= 0)
                this.kill();
        },
        
        draw: function()
        {
            this.parent();
            
            this.back.draw(this.backLeft.x - (this.leftBackOffsetMax * this.amountOpen), this.backLeft.y);
        }
    });
});