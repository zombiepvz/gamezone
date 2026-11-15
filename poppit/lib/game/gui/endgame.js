ig.module(
    'game.gui.endgame'
)

.requires(
    'impact.impact',
    
    'game.guiBase.guiPopup',
    'game.guiBase.buttonFactory',
    'game.gui.powerupButton',
    'game.fonts.bmFontLabel'
)
.defines(function()
{    
    
    EndgameUI = GUIPopup.extend
    ({    
        okButton: null,
        
        largeScoreFont: new ig.Font( 'media/fonts/ScoreLarge.png' ),
        smallScoreFont: new ig.Font( 'media/fonts/ScoreSmall.png' ),
        
        ScoreLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        PrizesReleasedLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        UnusedPowerupLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        SuperpopBonusLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        FiveOrLessLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        TotalScoreLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        //YourBestScoreLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        OKButtonLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),

        backgroundImage: new ig.Image('media/images/menu/GameSummary_BG2.png'),
        
        setupUI: function()
        {
            var buttonFactory = new ButtonFactory('media/images/menu/ok_button2.png', 190, 40);
            buttonFactory.buttonSize = {x: 190, y: 40};
            this.okButton = buttonFactory.createButton(0, ig.system.width - 200, ig.system.height - 40);
            this.okButton.onTrigger = function()
            {
                BalloonGrid.instance.resetGrid();
                ig.game.endgameUI.hide();
            }
            this.elements.push(this.okButton);
            
            this.largeScoreFont.letterSpacing = -3;
            this.largeScoreFont.firstChar = 48;
            
            this.smallScoreFont.letterSpacing = -3;
            this.smallScoreFont.firstChar = 48;
            
            var leftJust = 35;
            this.SetupLabel(this.ScoreLabel,            {x: 170, y: 65}, 0.8, BMFontLabel.ALIGN.CENTER, AllStrings["summaryScreenScoreLabel"]);
            this.SetupLabel(this.PrizesReleasedLabel,   {x: leftJust, y: 107}, 0.5, BMFontLabel.ALIGN.LEFT, AllStrings["prizesReleasedText"]);
            this.SetupLabel(this.UnusedPowerupLabel, {x: leftJust, y: 128}, 0.5, BMFontLabel.ALIGN.LEFT, AllStrings["summaryScreenUnusedPowerupsLabel"]);
            this.SetupLabel(this.SuperpopBonusLabel, {x: leftJust, y: 149}, 0.5, BMFontLabel.ALIGN.LEFT, AllStrings["superPopBonusText"]);
            this.SetupLabel(this.FiveOrLessLabel, {x: leftJust, y: 168}, 0.5, BMFontLabel.ALIGN.LEFT, "5 " + AllStrings["balloonsLeftText"]);
            this.SetupLabel(this.TotalScoreLabel, {x: leftJust, y: 210}, 0.5, BMFontLabel.ALIGN.LEFT, AllStrings["totalScoreText"]);
            //this.SetupLabel(this.YourBestScoreLabel, {x: leftJust, y: 231}, 0.5, BMFontLabel.ALIGN.LEFT, AllStrings["bestScoreText"]);
            this.SetupLabel(this.OKButtonLabel, {x: 377, y: 289}, 0.5, BMFontLabel.ALIGN.CENTER, AllStrings["okText"]);
            
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
                this.backgroundImage.draw(0, 0);
                this.okButton.draw();
                
                this.largeScoreFont.draw(ig.game.player.score.toString(), 260, 62, ig.Font.ALIGN.LEFT);
                
                this.smallScoreFont.draw(ig.game.player.prizesReleased.toString(), 440, 105, ig.Font.ALIGN.RIGHT);
                this.smallScoreFont.draw(ig.game.player.unusedPowerups.toString(), 440, 125, ig.Font.ALIGN.RIGHT);
                this.smallScoreFont.draw(ig.game.player.superPopBonus.toString(), 440, 145, ig.Font.ALIGN.RIGHT);
                this.smallScoreFont.draw(ig.game.player.balloonsRemainingBonus.toString(), 440, 165, ig.Font.ALIGN.RIGHT);
                
                this.smallScoreFont.draw(ig.game.player.score.toString(), 440, 208, ig.Font.ALIGN.RIGHT);
                //this.smallScoreFont.draw(ig.game.player.score.toString(), 440, 228, ig.Font.ALIGN.RIGHT);
                
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