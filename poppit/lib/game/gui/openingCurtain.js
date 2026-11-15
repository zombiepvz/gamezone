ig.module(
    'game.gui.openingCurtain'
)

.requires(
    'impact.impact',
    
    'game.fonts.bmFont',
    'game.fonts.bmFontLabel',
    
    'game.gui.curtain'
)
.defines(function()
{    
    OpeningCurtain = CurtainTransition.extend
    ({  
        touched: false,
        introDone: false,
        introRunning: false,
        
        logo: new ig.Image('media/images/menu/PoppitMainMenuLogo.png'),
        logoEntering: true,
        timeToEnter: 1,
        amountComplete: 0,
        
        logoOffsetMax: 195,
        logoPos: {x: 118, y: -100},
        
        init: function()
        {
            this.parent();
            this.hide();
        },
        
        play: function()
        {   
            this.logoRunning = true;
            this.logoEntering = true;
            this.show();
        },
        
        exit: function()
        {
            this.logoRunning = true;
            this.logoEntering = false;
        },
        
        clickDown: function(pos)
        {
            if (!this.active) return false;
            if (this.touched) return this.active;
            if (!this.introDone) return true;
            this.touched = true;
            this.exit();
            return this.parent();
        },
        
        stopLogo: function()
        {
            this.parent();
            this.logoRunning = false;
            this.amountComplete = this.logoEntering ? 1 : 0;
        },
        
        update: function()
        {
            this.parent();            
            if (this.logoRunning)
            {
                var dir = this.logoEntering ? 1 : -1;
                this.amountComplete += (ig.system.tick / this.timeToEnter) * dir;
                if ((this.logoEntering && this.amountComplete >= 1) || (!this.logoEntering && this.amountComplete <= 0))
                {
                    this.stopLogo();
                    if (this.logoEntering) this.introDone = true;
                    else this.open();
                }
            }
        },
        
        draw: function()
        {
            this.parent();
            
            if (this.active)
            {
                this.logo.draw(this.logoPos.x, this.logoPos.y + (this.logoOffsetMax * this.amountComplete));
                
                if (!this.running && !this.logoRunning && this.amountComplete == 1)
                {
                    var ctx = ig.system.context;
                    var w = ig.system.realWidth;
                    var h = ig.system.realHeight;
                    ctx.save();
                    ctx.fillStyle = 'rgb(255,255,255)';
                    ctx.textAlign = 'center';
                    ctx.font = '18px helvetica';
                    ctx.fillText(AllStrings["splashContinueText"], 240, 250);
                    ctx.restore();
                }
            }
        }
    });
});