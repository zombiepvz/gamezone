ig.module(
    'game.gui.spikeSpeechBubble'
)

.requires(
    'impact.impact',
    
    'game.guiBase.guiPopup',
    'game.guiBase.buttonFactory',
    
    'game.utils.drawUtils'
)
.defines(function()
{    
    SpikeSpeechBubble = GUIPopup.extend
    ({    
        okButton: null,
        bubble: new ig.Image('media/images/dialog/PoppitDialogBalloon.png'),
        
        lineWidth: 300,
        lineSpacing: 20,

        cursorStart: {x: 145, y: 80},
        
        font: '14px Arial',
        
        text: "",
        
        setupUI: function()
        {
            var buttonFactory = new ButtonFactory('media/images/level/buttons.png', 70, 38);
            buttonFactory.buttonSize = {x: 70, y: 38};
            
            this.okButton = buttonFactory.createButton(2, 362, 135);
                        
            this.okButton.onTrigger = function()
            {
                BalloonGrid.instance.resetGrid();
                ig.game.spikeDialog.hide();
            }
                        
            this.elements.push(this.okButton);
            
            this.parent();
        },
        
        updateActive: function()
        {
            this.okButton.setActive(this.active);
        },

        draw: function()
        {
            if (this.active)
            {
                this.bubble.draw(100, 50);
                this.okButton.draw();
                
                var ctx = ig.system.context;
                
                ctx.save()
                
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.textAlign = 'left';
                ctx.font = this.font;                
                
                DrawUtils.drawWrapString(ctx, this.text, this.cursorStart.x, this.cursorStart.y, this.lineSpacing, this.lineWidth)
                
                ctx.restore()
            }
        }
    });
});