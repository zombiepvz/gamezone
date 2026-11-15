ig.module(
    'game.balloonGrid.balloonGridCell'
)

.requires(    
    'game.entities.balloon',
    'game.entities.powerupitem',
    'game.entities.prizeitem',
    'game.entities.prize',
    
    'game.utils.utils',
    'game.utils.vec2'
)

.defines(function()
{
    BalloonGridCell = ig.Class.extend
    ({
        x: 0,
        y: 0,
        pixelPos: {x: 0, y: 0},
        visited: false,
        balloonNeedsMoved: false,
        balloon: null,
        balloonSpeed: 500,
        item: null,
        
        init: function(x, y)
        {
            this.x = x;
            this.y = y;
            
            this.pixelPos = BalloonGrid.instance.getGridPixelPosition(this.x, this.y);
            this.createBalloon();
        },
        
        createBalloon: function(color)
        {
            if (this.balloon && this.balloon.color != color)
                this.balloon.kill()
            
            if (color === undefined) color = Utils.random(EntityBalloon.COLORS.keys().length + 1) * 3;
            
            this.balloon = ig.game.spawnEntity(EntityBalloon, 0, 0);
            this.balloon.setColor(color);
            this.balloon.setPos(this.pixelPos);
        },
        
        insertBalloon: function(balloon)
        {
            this.balloonNeedsMoved = true;
            this.balloon = balloon;
        },
        
        removeBalloon: function()
        {
            this.balloonNeedsMoved = false;
            this.balloon = null;
        },
        
        killBalloon: function()
        {
            if (this.balloon)
                this.balloon.kill();
                
            this.balloon = null;
        },
        
        createPrize: function()
        {
            var prize = ig.game.spawnEntity(EntityPrizeItem, 0, 0);
            prize.setPos(this.pixelPos);
            prize.prizeNumber = Utils.getRandomElementFromTableAndRemove(BalloonGrid.instance.availablePrizes);
            this.insertItem(prize);
            BalloonGrid.instance.items.push(prize);
        },
        
        restorePrize: function(prizeNumber)
        {
            for (var i = 0; i < BalloonGrid.instance.items.length; i++)
            {
                var item = BalloonGrid.instance.items[i];
                if (item instanceof EntityPowerupItem) continue;
                if (item.prizeNumber == prizeNumber)
                {
                    this.insertItem(item);
                    item.state = EntityBalloonItem.STATES.ALIVE;
                    item.RestartAnimation();
                }
            }
        },
        
        restorePowerup: function(powerupType)
        {
            for (var i = 0; i < BalloonGrid.instance.items.length; i++)
            {
                var item = BalloonGrid.instance.items[i];
                if (item instanceof EntityPrizeItem) continue;
                if (item.powerupType == powerupType) // TODO Needed?
                {
                    this.insertItem(item);
                    item.state = EntityBalloonItem.STATES.ALIVE;
                    item.RestartAnimation();
                }
            }
        },
        
        createPowerup: function(powerupType)
        {
            var powerup = ig.game.spawnEntity(EntityPowerupItem, 0, 0);
            powerup.setPos(this.pixelPos);
            powerup.powerupType = powerupType;
            this.insertItem(powerup);
            BalloonGrid.instance.items.push(powerup);
        },
        
        insertItem: function(item)
        {
            if (this.item) return false;
            this.balloonNeedsMoved = true;
            this.item = item;
            this.item.cell = this;
            return true
        },
        
        removeItem: function()
        {
            this.item = null;
        },
        
        updateBalloonPos: function()
        {
            this.pixelPos = BalloonGrid.instance.getGridPixelPosition(this.x, this.y);
            
            if (this.balloonNeedsMoved && this.balloon instanceof EntityBalloon)
            {
                var curPos = new Vec2(this.balloon.pos.x, this.balloon.pos.y);
                var dir = this.pixelPos.subV(curPos);
                
                var speed = this.balloonSpeed * ig.system.tick;
                var distSqr = dir.lengthSqr();
                var speedSqr = speed * speed;

                if (distSqr <= speedSqr)
                {
                    this.balloon.setPos(this.pixelPos);
                    
                    if (this.item)
                        this.item.setPos(this.pixelPos);
                    
                    this.balloonNeedsMoved = false;
                }
                else
                {
                    dir.normalize();
                    
                    this.balloon.pos.x += dir.x * speed;
                    this.balloon.pos.y += dir.y * speed;
                    
                    if (this.item)
                        this.item.pos.x += dir.x * speed;
                }
            }
            else
            {
                if (this.balloon)
                    this.balloon.setPos(this.pixelPos);
                
                if (this.item)
                    this.item.setPos(this.pixelPos);
            }
        },
        
        update: function()
        {
            this.updateBalloonPos();
        },
        
        draw: function()
        {
            if (this.balloon instanceof EntityBalloon)
                this.balloon.draw();
        }
    });
});