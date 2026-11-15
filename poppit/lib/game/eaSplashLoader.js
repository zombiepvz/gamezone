// Original: https://github.com/phoboslab/impact-splash-loader

ig.module(
    'game.eaSplashLoader'
)

.requires(
    'impact.loader'
)

.defines(function()
{
    EASplashLoader = ig.Loader.extend
    ({
        endTime: 0,
        fadeToBlackTime: 250,
        fadeToGameTime: 400,
        progressBarWidth: 340,
        progressBarHeight: 220,
    
        background: null,
    
        init: function( gameClass, resources )
        {
            this.parent( gameClass, resources );
        
            this.background = new Image();
            this.background.src = 'media/images/DefaultFF.png'
        },
    
        run: function() 
        {
            var t = Date.now() - this.endTime;
            var alpha = 1;
            if( t < this.fadeToBlackTime ) 
            {
                this.draw();
                alpha = t.map( 0, this.fadeToBlackTime, 0, 1);
            }
            else if( t < this.fadeToGameTime ) 
            {
                ig.game.run();
                alpha = t.map( this.fadeToBlackTime, this.fadeToGameTime, 1, 0);
            }
            else 
            {
                ig.system.setDelegate( ig.game );
                return;
            }
            
            ig.system.context.fillStyle = 'rgba(0,0,0,'+alpha+')';
            ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
        },

        end: function()
        {
            this.parent();
            this.endTime = Date.now();

            ig.system.setDelegate( this );
        },
    
        draw: function() {
            // Some damping for the status bar
            this._drawStatus += (this.status - this._drawStatus)/5;
        
            var ctx = ig.system.context;
            var w = ig.system.realWidth;
            var h = ig.system.realHeight;
            var scale = w / this.progressBarWidth / 3; // Logo size should be 1/3 of the screen width
            var center = (w - this.progressBarWidth * scale)/2;
        
            ctx.drawImage(this.background,0,0,w,h);
        
/*
            ctx.fillStyle = 'rgb(155,155,155)';
            ctx.textAlign = 'right';
            ctx.font = '10px Arial';
            ctx.fillText( 'http://jetsetgames.net \u2122', w - 10, h - 10 );
            ctx.textAlign = 'left';
*/
            ctx.save();
        
                ctx.translate( center, h / 2.5 );
                ctx.scale( scale, scale );
            
                ctx.lineWidth = '3';
                ctx.strokeStyle = 'rgb(255,255,255)';
                ctx.strokeRect( 25, this.progressBarHeight + 40, 300, 20 );
            
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.fillRect( 30, this.progressBarHeight + 45, 290 * this._drawStatus, 10 );        

            ctx.restore();
        }
    });
});
