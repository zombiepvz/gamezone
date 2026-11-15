ig.module(
    'game.gui.curtain'
)

.requires(
    'impact.impact',
    
    'game.guiBase.guiPopup'
)
.defines(function()
{    
    CurtainTransition = GUIPopup.extend
    ({  
        back: new ig.Image('media/images/menu/PoppitCurtainMain.png'),
        top: new ig.Image('media/images/menu/PoppitCurtainTop.png'),
        side: new ig.Image('media/images/menu/PoppitCurtainSide1.png'),
        
        running: false,
        opening: true,
        
        amountOpen: 0,
        
        timeToOpen: 1,
        
        topOffsetMax: 80,
        
        leftBackOffsetMax: 260,
        rightBackOffsetMax: 260,
        
        leftSideOffsetMax: 106,
        rightSideOffsetMax: 106,
                
        backLeft: {x: 0, y: 0},
        backRight: {x: 240, y: 0},
        
        frontLeft: {x: 24, y: -30},
        frontRight: {x: 231, y: -30},
        frontCenter: {x: 128, y: -15},
        
        sideLeft: {x: 106, y: 218},
        sideRight: {x: 374, y: 0},
                
        start: function()
        {
            this.running = true;
            
            if (!this.opening)
                this.show();
        },
        
        stop: function()
        {
            this.running = false;
            this.amountOpen = this.opening ? 1 : 0;
            
            if (this.opening)
                this.hide();
        },
        
        open: function()
        {
            this.opening = true;
            this.start();
        },
        
        close: function()
        {
            this.amountOpen = 1;
            this.opening = false;
            this.start();
        },
        
        onClosed: false,
        onOpened: false,
        
        update: function()
        {
            if (this.running)
            {
                var dir = this.opening ? 1 : -1;
                var delta = (ig.system.tick / this.timeToOpen) * dir;
                this.amountOpen += delta;
                
                if ((this.opening && this.amountOpen >= 1) || (!this.opening && this.amountOpen <= 0))
                {
                    this.stop();
                    if (this.opening && this.onOpened)
                    {
                        this.onOpened();
                    }
                    else if (!this.opening && this.onClosed)
                    {
                        this.onClosed();
                    }
                }
            }
        },
        
        draw: function()
        {
            if (this.active)
            {
                this.back.draw(this.backLeft.x - (this.leftBackOffsetMax * this.amountOpen), this.backLeft.y);
                this.back.draw(this.backRight.x + (this.rightBackOffsetMax * this.amountOpen), this.backRight.y);
                
                this.top.draw(this.frontLeft.x, this.frontLeft.y - (this.topOffsetMax * this.amountOpen));
                this.top.draw(this.frontRight.x, this.frontRight.y - (this.topOffsetMax * this.amountOpen));
                this.top.draw(this.frontCenter.x, this.frontCenter.y - (this.topOffsetMax * this.amountOpen));
                
                this.side.drawTile(0, 0, 0, this.sideLeft.x - (this.leftSideOffsetMax * this.amountOpen), this.sideLeft.y, true, false);
                this.side.draw(this.sideRight.x + (this.rightSideOffsetMax * this.amountOpen), this.sideRight.y);
            }
        }
    });
});