ig.module(
    'game.gui.HowToPlayMenu'
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
    HowToPlayMenu = GUIPopup.extend
    ({
        BackgroundImage: new ig.Image('media/images/menu/PoppitMenuBkg.png'),

        BasicsButton: null,
        GameplayButton: null,
        SkillLevelsButton: null,
        TipsButton: null,
        BackButton: null,

        HowToPlayMenuLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        BasicsLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        SkillLevelsLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        GameplayLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        TipsLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        BackLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),

        setupUI: function()
        {
            var strings = AllStrings['helpText'];
            var areas = {};
            for (var key in strings)
            {
                area = {};
                for (var key2 in strings[key])
                {
                    area[key2] = strings[key][key2];
                }
                areas[key] = area;
            }
            
            this.HowToPlayMenuLabel.pos = {x: 324, y: 28};
            this.HowToPlayMenuLabel.scale = {x: 0.7, y: 0.7};
            this.HowToPlayMenuLabel.align = BMFontLabel.ALIGN.CENTER;
            this.HowToPlayMenuLabel.setText(AllStrings["howToPlayText"]);
            
            var backButtonFactory = new ButtonFactory('media/images/menu/back_button2.png', 87, 36);
            backButtonFactory.buttonSize = {x: 87, y:36};
            this.BackButton = backButtonFactory.createButton(0, 10, 10);
            this.BackButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.MainMenuUI.show();
                    ig.game.HowToPlayMenuUI.hide();
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

            var baseX = 248;
            var buttonFactory = new ButtonFactory('media/images/menu/menu_buttons.png', 164, 45);
            buttonFactory.buttonSize = {x: 164, y: 45};
            
            this.BasicsButton = buttonFactory.createButton(6, baseX, 90);
            this.BasicsButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.BasicsHelpUI.show();
                    ig.game.HowToPlayMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.onOpened = function()
                {
                    ig.game.BasicsHelpUI.ShowDiv(true);
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.BasicsButton);

            this.GameplayButton = buttonFactory.createButton(8, baseX, 135);
            this.GameplayButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.GameplayHelpUI.show();
                    ig.game.HowToPlayMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.onOpened = function()
                {
                    ig.game.GameplayHelpUI.ShowDiv(true);
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.GameplayButton);

            this.SkillLevelsButton = buttonFactory.createButton(4, baseX, 180);
            this.SkillLevelsButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.SkillLevelsHelpUI.show();
                    ig.game.HowToPlayMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.onOpened = function()
                {
                    ig.game.SkillLevelsHelpUI.ShowDiv(true);
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.SkillLevelsButton);

            this.TipsButton = buttonFactory.createButton(2, baseX, 225);
            this.TipsButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.TipsHelpUI.show();
                    ig.game.HowToPlayMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.onOpened = function()
                {
                    ig.game.TipsHelpUI.ShowDiv(true);
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.TipsButton);
            
            var labelScale = {x: 0.4, y: 0.4};
            var labelX = baseX + 83;
            var labelY = 103;
            
            this.BasicsLabel.pos = {x: labelX, y: labelY};
            this.BasicsLabel.scale = labelScale;
            this.BasicsLabel.align = BMFontLabel.ALIGN.CENTER;
            this.BasicsLabel.setText(areas["helpBasics"]["title"]);
            labelY += 45;

            this.SkillLevelsLabel.pos = {x: labelX, y: labelY};
            this.SkillLevelsLabel.scale = labelScale;
            this.SkillLevelsLabel.align = BMFontLabel.ALIGN.CENTER;
            this.SkillLevelsLabel.setText(areas["helpGameplay"]["title"]);
            labelY += 45;

            this.GameplayLabel.pos = {x: labelX, y: labelY};
            this.GameplayLabel.scale = labelScale;
            this.GameplayLabel.align = BMFontLabel.ALIGN.CENTER;
            this.GameplayLabel.setText(areas["helpSkillLevels"]["title"]);
            labelY += 45;

            this.TipsLabel.pos = {x: labelX, y: labelY};
            this.TipsLabel.scale = labelScale;
            this.TipsLabel.align = BMFontLabel.ALIGN.CENTER;
            this.TipsLabel.setText(areas["helpTips"]["title"]);
            labelY += 45;

            this.elements.push(this.HowToPlayMenuLabel);
            this.elements.push(this.BasicsLabel);
            this.elements.push(this.SkillLevelsLabel);
            this.elements.push(this.GameplayLabel);
            this.elements.push(this.TipsLabel);

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
