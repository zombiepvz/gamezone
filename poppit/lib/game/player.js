ig.module(
    'game.player'
)

.requires(
    'impact.impact',
    
    'game.touchHandler'
)

.defines(function()
{
    
    Player = ig.Class.extend
    ({        
        win: false,
        score: 0,
        difficulty: 0,
        
        prizesReleased: 0,
        unusedPowerups: 0,
        superPopBonus: 0,
        balloonsRemainingBonus: 0,
        
        staticInstantiate: function( )
        {
            if( Player.instance == null )
                return null;
            else 
                return Player.instance;
        },

        init: function( xSize, ySize ) 
        {
            Player.instance = this;
        },
        
        reset: function()
        {
            this.score = 0;
            this.prizesReleased = 0;
            this.unusedPowerups = 0;
            this.superPopBonus = 0;
            this.balloonsRemainingBonus = 0;
            this.win = false;
        },
        
        calculateFinalScore: function()
        {
            var anvilBonus = ig.game.ingameUI.anvilButton.anvilCount * 25;
            var pinBonus = ig.game.ingameUI.pinButton.pinCount * 25;
            
            this.unusedPowerups = anvilBonus + pinBonus;
            
            this.balloonsRemainingBonus = 0;
            if (BalloonGrid.instance.balloonsLeft <= 5)
                this.balloonsRemainingBonus = (6 - BalloonGrid.instance.balloonsLeft) * 25;
                
            this.score += this.unusedPowerups + this.balloonsRemainingBonus;
        },
        
        balloonsPopped: function(count)
        {
            var points = 0;
            
            if (count >= 5)
            {
                points = count * 10;
                this.score += points;
                this.superPopBonus += points;
            }
            
            return points;
        },

        getPrizePoints: function(points)
        {
            this.score += points;
            this.prizesReleased += points;
            return points;
        },
        
        prizeReleased: function(prize)
        {
            return this.getPrizePoints(20);
        },
        
        prizeHitTarget: function(prize)
        {
            return this.getPrizePoints(70);
        }
        
    });
    
    // These will be the indexes for BalloonGrid.DifficultyDefs
    Player.DIFFICULTIES =
    {
        EASY: 0,
        NORMAL: 1,
        HARD: 2
    };

});