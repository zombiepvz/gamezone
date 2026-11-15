ig.module(
    'game.guiBase.buttonFactory'
)

.requires(
    'impact.impact',
    'game.guiBase.button'
)
.defines(function() {
    
    ButtonFactory = ig.Class.extend
    ({
    	buttonSheet: null,
        buttonSize: {x: 0, y: 0},
        
        init: function(spriteSheet, spriteWidth, spriteHeight)
        {
            this.buttonSheet = new ig.AnimationSheet(spriteSheet, spriteWidth, spriteHeight);
            this.buttonSize = {x: spriteWidth, y: spriteHeight};
        },
        
        createButton: function(normalStateIndex, x, y, buttonClass)
        {
            if (buttonClass === undefined) buttonClass = EntityButton;
            
            var button = ig.game.spawnEntity(buttonClass, x, y);
            button.size = this.buttonSize;
            button.setAnimSheet(this.buttonSheet, normalStateIndex);
            button.zIndex = 5;
            
            return button;
        }
    });
})