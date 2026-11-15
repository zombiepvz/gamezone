ig.module(
    'game.gui.ingame'
)

.requires(
    'impact.impact',
    
    'game.guiBase.guiBase',
    'game.guiBase.buttonFactory',
    'game.gui.powerupButton',
    
    'game.balloonGrid.balloonGrid'
)
.defines(function()
{    
    IngameUI = GUIBase.extend
    ({
        pinButton: null,
        anvilButton: null,
        undoButton: null,
        
        MenuButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        UndoButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),

        setupUI: function()
        {
            var labelScale = {x: 0.4, y: 0.4};

            var buttonFactory = new ButtonFactory('media/images/level/buttons2.png', 70, 38);
            buttonFactory.buttonSize = {x: 70, y: 38};
            
            var menuButton = buttonFactory.createButton(0, 10, ig.system.height - 48);
            menuButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.MainMenuUI.show();
                    ig.game.curtain.open();
                };
                ig.game.curtain.close();
            }
            
            this.undoButton = buttonFactory.createButton(4, 70 + 20, ig.system.height - 48);
            this.undoButton.onTrigger = function()
            {
                BalloonGrid.instance.undo();
            }
            this.elements.push(this.undoButton);
            
            this.UndoButtonLabel.pos = {x: 125, y: ig.system.height - 38};
            this.UndoButtonLabel.scale = labelScale;
            this.UndoButtonLabel.align = BMFontLabel.ALIGN.CENTER;
            this.UndoButtonLabel.setText(AllStrings["undoText"]);
            this.elements.push(this.UndoButtonLabel);
            
            buttonFactory.buttonSize = {x: 58, y: 36};
            
            this.pinButton = buttonFactory.createButton(6, 2, 70, EntityPowerupButton);
            this.pinButton.toggle = true;
            this.pinButton.onTrigger = function(button)
            {
                ig.game.ingameUI.anvilButton.toggled = false;
                ig.game.ingameUI.anvilButton.deselect();
                BalloonGrid.instance.anvilActive = false;
                
                BalloonGrid.instance.pinActive = button.toggled;
                BalloonGrid.instance.resetEndGame();
            }
            
            this.anvilButton = buttonFactory.createButton(6, 60, 70, EntityPowerupButton);
            this.anvilButton.toggle = true;
            this.anvilButton.onTrigger = function(button)
            {
                // Activate powerup
                ig.game.ingameUI.pinButton.toggled = false;
                ig.game.ingameUI.pinButton.deselect();
                BalloonGrid.instance.pinActive = false;
                
                BalloonGrid.instance.anvilActive = button.toggled;
                BalloonGrid.instance.resetEndGame();
            }
            
            this.elements.push(menuButton);
            
            this.elements.push(this.pinButton);
            this.elements.push(this.anvilButton);
            
            this.MenuButtonLabel.pos = {x: 45, y: ig.system.height - 38};
            this.MenuButtonLabel.scale = labelScale;
            this.MenuButtonLabel.align = BMFontLabel.ALIGN.CENTER;
            this.MenuButtonLabel.setText(AllStrings["menuText"]);
            this.elements.push(this.MenuButtonLabel);
        },

        draw: function()
        {
            var canUndo = (BalloonGrid.instance.undoStack.length != 0);
            this.undoButton.setActive(canUndo);
            this.UndoButtonLabel.setActive(canUndo);
            var el = null;
            for (var i = 0; i < this.elements.length; i++)
            {
                el = this.elements[i];
                el.draw();
            }
        },

    });
})