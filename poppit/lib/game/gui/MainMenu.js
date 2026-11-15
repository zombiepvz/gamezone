ig.module(
    'game.gui.MainMenu'
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
    MainMenuUI = GUIPopup.extend
    ({
        BackgroundImage: new ig.Image('media/images/menu/PoppitMenuNoSpike.png'),

        ResumeButton: null,
        NewGameButton: null,
        L2PButton: null,
        OptionsButton: null,
        AboutButton: null,
        EulaButton: null,
        PrivacyButton: null,
        TosButton: null,

        MainMenuLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        ResumeButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        NewGameButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        L2PButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        OptionsButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        AboutLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        Eula1Label: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        Eula2Label: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        PrivacyLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        TosLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        
        init: function()
        {
            this.parent();
        },
        
        setupUI: function()
        {
            var lang = "en";
            lang = navigator.language.substring(0,2);
            if (lang == 'pt') lang = 'br'; // ...
            var origX = 140;
            var origY = 110;
            var baseX = origX;
            var xOff = 170;
            var baseY = origY;
            var yOff = 45;
            
            this.SetupLabel(this.MainMenuLabel, {x: 324, y: 28}, 0.7, BMFontLabel.ALIGN.CENTER, AllStrings["mainMenuText"]);

            var buttonFactory = new ButtonFactory('media/images/menu/menu_buttons.png', 164, 45);
            buttonFactory.buttonSize = {x: 164, y: 45};
            
            this.ResumeButton = buttonFactory.createButton(0, baseX, baseY);
            this.ResumeButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.MainMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.ResumeButton);
            baseY += yOff;

            this.NewGameButton = buttonFactory.createButton(2, baseX, baseY);
            this.NewGameButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    BalloonGrid.instance.resetGrid();
                    ig.game.MainMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.NewGameButton);
            baseY += yOff;

            this.L2PButton = buttonFactory.createButton(4, baseX, baseY);
            this.L2PButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.HowToPlayMenuUI.show();
                    ig.game.MainMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.L2PButton);
            baseY += yOff;

            this.OptionsButton = buttonFactory.createButton(6, baseX, baseY);
            this.OptionsButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.OptionsMenuUI.show();
                    ig.game.MainMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.OptionsButton);
            baseY = origY;
            baseX += xOff;
            
            this.AboutButton = buttonFactory.createButton(6, baseX, baseY);
            this.AboutButton.onTrigger = function()
            {
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.AboutScreenUI.show();
                    ig.game.MainMenuUI.hide();
                    ig.game.curtain.open();
                };
                ig.game.curtain.onOpened = function()
                {
                    ig.game.AboutScreenUI.ShowDiv(true);
                };
                ig.game.curtain.close();
            }
            this.elements.push(this.AboutButton);
            baseY += yOff;

            this.EulaButton = buttonFactory.createButton(8, baseX, baseY);
            this.EulaButton.onTrigger = function()
            {
                // window.location = 'http://tos.ea.com/legalapp/mobileeula/US/'+ lang +'/GM/';
				window.open('http://tos.ea.com/legalapp/mobileeula/US/' + lang + '/GM/', '_blank');
            }
            this.elements.push(this.EulaButton);
            baseY += yOff;

            this.PrivacyButton = buttonFactory.createButton(0, baseX, baseY);
            this.PrivacyButton.onTrigger = function()
            {
				// window.location = 'http://tos.ea.com/legalapp/WEBPRIVACY/US/'+ lang +'/PC/';
				window.open('http://tos.ea.com/legalapp/WEBPRIVACY/US/' + lang + '/PC/', '_blank');
            }
            this.elements.push(this.PrivacyButton);
            baseY += yOff;

            this.TosButton = buttonFactory.createButton(2, baseX, baseY);
            this.TosButton.onTrigger = function()
            {
                // window.location = 'http://tos.ea.com/legalapp/WEBTERMS/US/'+ lang +'/PC/';
				window.open('http://tos.ea.com/legalapp/WEBTERMS/US/' + lang + '/PC/', '_blank');
            }
            this.elements.push(this.TosButton);

            baseX = origX;
            var labelScale = 0.4;
            var labelX = baseX + 83;
            var labelY = origY + 13;
            
            this.SetupLabel(this.ResumeButtonLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["resumeGameText"]);
            labelY += yOff;
            this.SetupLabel(this.NewGameButtonLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["newGameText"]);
            labelY += yOff;
            this.SetupLabel(this.L2PButtonLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["howToPlayText"]);
            labelY += yOff;
            this.SetupLabel(this.OptionsButtonLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["optionsText"]);
            labelY = origY + 13;
            labelX += xOff;

            this.SetupLabel(this.AboutLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["aboutText"]);
            labelY += yOff;
	    if (AllStrings["eulaText2"].length < 1)
	    {
		this.SetupLabel(this.Eula1Label, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["eulaText1"]);
		labelY += yOff;
	    }
	    else
	    {
		labelY -= 8;
		this.SetupLabel(this.Eula1Label, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["eulaText1"]);
		labelY += 14;
		this.SetupLabel(this.Eula2Label, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["eulaText2"]);
		labelY += yOff + 8 - 14;
	    }
            this.SetupLabel(this.PrivacyLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["privacyText"]);
            labelY += yOff;
            this.SetupLabel(this.TosLabel, {x: labelX, y: labelY}, labelScale, BMFontLabel.ALIGN.CENTER, AllStrings["tosText"]);

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
