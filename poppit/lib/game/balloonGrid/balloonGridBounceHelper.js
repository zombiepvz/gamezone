ig.module(
    'game.balloonGrid.balloonGridBounceHelper'
)

.requires(
    'impact.impact'
)

.defines(function()
{
    BalloonBounceHelper = ig.Class.extend
    ({
        bounceIdle: 15,
        bounceDuration: 4,
        bounce: false,
        bounceColumns: 0,
        bounceSpeed: 2*Math.PI,
        bounceCount: 0,
        bounceMaxOffset: 6,
        columnsYOffset: [],
        
        getYOffset: function(x)
        {
            if (this.columnsYOffset[x])
                return Math.sin(this.columnsYOffset[x]) * this.bounceMaxOffset;
            else
                return 0;
        },

        reset: function()
        {
            this.columnsYOffset = [];
            
            for (var i = 0; i < BalloonGrid.instance.size.x; i++)
                this.columnsYOffset.push(0);
        },
        
        update: function()
        {
            var bounceIdleWindow = (this.bounceIdle + this.bounceDuration);

            if (!this.bounce && 
                BalloonGrid.instance.idle > this.bounceIdle && 
                BalloonGrid.instance.idle < bounceIdleWindow)
            {
                this.bounce = true;
                this.bounceColumns = 1;
            }
            else if (BalloonGrid.instance.idle > bounceIdleWindow)
            {
                this.bounce = false;
            } 
            else if (BalloonGrid.instance.idle < this.bounceIdle)
            {
                this.bounce = false;
                this.bounceColumns = 0;
                for (var i = 0; i < this.columnsYOffset.length; i++)
                    this.columnsYOffset[i] = 0;
            }

            for (var i = 0; i < this.bounceColumns; i++)
            {
                var j = i;
                
                if (!this.bounce)
                    var j = (BalloonGrid.instance.curSize.x - 1) - i;
                
                this.columnsYOffset[j] += this.bounceSpeed * ig.system.tick;
            
                if (this.bounce && this.columnsYOffset[i] > ((Math.PI)/4))
                {
                    if (i == this.bounceColumns - 1 && this.bounceColumns < BalloonGrid.instance.curSize.x)
                        this.bounceColumns++;
                }
                else if (!this.bounce)
                {
                    if (i == this.bounceColumns - 1)
                    {   
                        if (Math.abs(this.columnsYOffset[j] - (0)) < 0.1 ||
                            Math.abs(this.columnsYOffset[j] - (Math.PI))  < 0.1 ||
                            Math.abs(this.columnsYOffset[j] - (2*Math.PI))  < 0.1)
                        {
                            this.columnsYOffset[j] = 0;
                            this.bounceColumns--;
                        }
                    }
                }
                
                if (this.columnsYOffset[j] >= (2*Math.PI))
                    this.columnsYOffset[j] = 0;
            }
        }
    });
});