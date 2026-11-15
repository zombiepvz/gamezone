ig.module(
    'game.gui.OptionsMenu'
)

.requires(
    'impact.impact',
    
    'game.fonts.bmFont',
    'game.fonts.bmFontLabel',

    'game.guiBase.guiPopup',
    'game.guiBase.buttonFactory'
)
.defines(function()
{
    OptionsMenu = GUIPopup.extend
    ({
        BackgroundImage: new ig.Image('media/images/menu/PoppitMenuBkg.png'),

        EasyButton: null,
        MediumButton: null,
        HardButton: null,
        BackButton: null,

        DifficultyLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        EasyLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38Black.fnt', ""),
        MediumLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38Black.fnt', ""),
        HardLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38Black.fnt', ""),
        ResetMessagesLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        BackLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        TitleLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),

        setupUI: function()
        {
            var backButtonFactory = new ButtonFactory('media/images/menu/back_button2.png', 87, 36);
            backButtonFactory.buttonSize = {x: 87, y:36};
            this.BackButton = backButtonFactory.createButton(0, 10, 10);
            this.BackButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.MainMenuUI.show();
                    ig.game.OptionsMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.close();
            };
            this.elements.push(this.BackButton);
            this.BackLabel.pos = {x: 64, y: 18};
            this.BackLabel.scale = {x: 0.4, y: 0.4};
            this.BackLabel.align = BMFontLabel.ALIGN.CENTER;
            this.BackLabel.setText(AllStrings["backText"]);
            this.elements.push(this.BackLabel);

            var buttonFactory = new ButtonFactory('media/images/level/buttons2.png', 70, 38);
            buttonFactory.buttonSize = {x: 70, y: 38};
            
            var bumpY = 35; // TODO set to zero when reset messages returns.

            this.EasyButton = buttonFactory.createButton(2, 219, 135 + bumpY);
            this.EasyButton.onTrigger = function()
            {
                if (Player.instance.difficulty == 0) return;
                var change = confirm(AllStrings["SkillChangeNewGameAlertText"]);
                if (change)
                {
                    Player.instance.difficulty = 0;
                    BalloonGrid.instance.resetGrid();
                }
            }
            this.elements.push(this.EasyButton);

            this.MediumButton = buttonFactory.createButton(2, 289, 135 + bumpY);
            this.MediumButton.onTrigger = function()
            {
                if (Player.instance.difficulty == 1) return;
                var change = confirm(AllStrings["SkillChangeNewGameAlertText"]);
                if (change)
                {
                    Player.instance.difficulty = 1;
                    BalloonGrid.instance.resetGrid();
                }
            }
            this.elements.push(this.MediumButton);

            this.HardButton = buttonFactory.createButton(2, 359, 135 + bumpY);
            this.HardButton.onTrigger = function()
            {
                if (Player.instance.difficulty == 2) return;
                var change = confirm(AllStrings["SkillChangeNewGameAlertText"]);
                if (change)
                {
                    Player.instance.difficulty = 2;
                    BalloonGrid.instance.resetGrid();
                }
            }
            this.elements.push(this.HardButton);

            var buttonFactory2 = new ButtonFactory('media/images/menu/menu_buttons.png', 164, 45);
            buttonFactory2.buttonSize = {x: 164, y: 45};

            this.SetupLabel(this.TitleLabel,            {x: 324, y: 28}, 0.7, BMFontLabel.ALIGN.CENTER, AllStrings["optionsText"]);
            this.SetupLabel(this.DifficultyLabel,       {x: 324, y: 110 + bumpY}, 0.5, BMFontLabel.ALIGN.CENTER, AllStrings["skillLevelText"]);
            this.SetupLabel(this.EasyLabel,             {x: 254, y: 147 + bumpY}, 0.36, BMFontLabel.ALIGN.CENTER, AllStrings["easyText"]);
            this.SetupLabel(this.MediumLabel,           {x: 324, y: 147 + bumpY}, 0.36, BMFontLabel.ALIGN.CENTER, AllStrings["mediumText"]);
            this.SetupLabel(this.HardLabel,             {x: 394, y: 147 + bumpY}, 0.36, BMFontLabel.ALIGN.CENTER, AllStrings["hardText"]);

            this.parent();
        },

        updateActive: function()
        {
            var el = null;
            for (var i = 0; i < this.elements.length; i++)
            {
                el = this.elements[i];
                el.setActive(this.active);
            }
        },
        
        draw: function()
        {
            if (this.active)
            {            
                this.BackgroundImage.draw(0, 0);

                switch(Player.instance.difficulty)
                {
                    case 0:
                        this.EasyButton.setToggled(true);
                        this.MediumButton.setToggled(false);
                        this.HardButton.setToggled(false);
                        break;
                    case 1:
                        this.EasyButton.setToggled(false);
                        this.MediumButton.setToggled(true);
                        this.HardButton.setToggled(false);
                        break;
                    case 2:
                        this.EasyButton.setToggled(false);
                        this.MediumButton.setToggled(false);
                        this.HardButton.setToggled(true);
                        break;
                }

                var el = null;
                for (var i = 0; i < this.elements.length; i++)
                {
                    el = this.elements[i];
                    el.draw();
                }
            }
        }
    });
})
