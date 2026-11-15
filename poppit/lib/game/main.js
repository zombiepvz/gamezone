ig.module( 
    'game.main' 
)
.requires(
    'impact.game',
    'impact.font',
    
    'game.localizedStrings',
    'game.fonts.bmFont',
    'game.fonts.bmFontLabel',
    
    'game.eaSplashLoader',
    'game.touchHandler',    
    'game.entities.spike',
    'game.player',
    'game.balloonGrid.balloonGrid',
    'game.gui.ingame',
    'game.gui.endgame',
    'game.gui.spikeSpeechBubble',
    'game.gui.openingCurtain',
    'game.gui.MainMenu',
    'game.gui.HowToPlayMenu',
    'game.gui.BasicsHelp',
    'game.gui.GameplayHelp',
    'game.gui.SkillLevelsHelp',
    'game.gui.TipsHelp',
    'game.gui.OptionsMenu',
    'game.gui.AboutScreen'
)
.defines(function(){

Poppit = ig.Game.extend
({
	strings: new LocalizedStrings(navigator.language.substring(0,2)), 
	
    drawVersion: false,
    
    scoreLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', "0"),
    scoreTitleLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38Black.fnt', "0"),
    
    backgroundImage: new ig.Image('media/images/level/bg_sky.png'),
    foregroundImage: new ig.Image('media/images/level/fg_platforms.png'),
        
    ingameUI: null,
    endgameUI: null,
    MainMenuUI: null,
    HowToPlayMenuUI: null,
    BasicsHelpUI: null,
    GameplayHelpUI: null,
    SkillLevelsHelpUI: null,
    TipsHelpUI: null,
    OptionsMenuUI: null,
    AboutScreenUI: null,
    spikeDialog: null,
    curtain: null,
    
    gameover: false,
    
    player: null,
    balloonGrid: null,
    target: null,
    
    touchHandler: null,
    
    spike: null,
    
    staticInstantiate: function() 
    {
        ig.game = this;
        return null;
    },
    
    init: function() 
    {
        this.touchHandler = new TouchHandler();
        
        this.clearColor = null;
        this.sortBy = ig.Game.SORT.Z_INDEX;
        
        ig.Sound.channels = 5;
        
        this.player = new Player();
        
        this.ingameUI = new IngameUI();
        this.endgameUI = new EndgameUI();
        this.MainMenuUI = new MainMenuUI();
        this.HowToPlayMenuUI = new HowToPlayMenu();
        this.BasicsHelpUI = new BasicsHelp();
        this.GameplayHelpUI = new GameplayHelp();
        this.SkillLevelsHelpUI = new SkillLevelsHelp();
        this.TipsHelpUI = new TipsHelp();
        this.OptionsMenuUI = new OptionsMenu();
        this.AboutScreenUI = new AboutScreen();
        this.spikeDialog = new SpikeSpeechBubble();
        
        this.target = ig.game.spawnEntity(EntityTarget, 0, 0);
        
        this.balloonGrid = new BalloonGrid(11, 7);
        this.balloonGrid.padding = {x: 31.5, y: 37};
        this.balloonGrid.resetGrid();
        
        this.spike = ig.game.spawnEntity(EntitySpike, 0, 0);
        this.spike.zIndex = 10;        
        this.spike.setPos({x: 0, y: 275});
        
        ig.game.sortEntitiesDeferred();
        
        this.scoreLabel.pos = {x: 29, y: 30};
        this.scoreLabel.scale = {x: 0.5, y: 0.5};
        this.scoreLabel.align = BMFontLabel.ALIGN.CENTER;
        
        this.scoreTitleLabel.pos = {x: 29, y: 13};
        if (navigator.language.substring(0,2) == "en") this.scoreTitleLabel.scale = {x: 0.4, y: 0.4};
        else this.scoreTitleLabel.scale = {x: 0.3, y: 0.3};
        this.scoreTitleLabel.align = BMFontLabel.ALIGN.CENTER;
        this.scoreTitleLabel.setText(AllStrings["scoreBalloonLabelText"]);
        
        this.curtain = new OpeningCurtain();
        this.curtain.play();
        
        ig.soundManager.volume = 1;
    },
    
    update: function() 
    {
        this.parent();
        this.touchHandler.update();
        this.balloonGrid.update();
        this.curtain.update();
        
        this.scoreLabel.setText(this.player.score);
    },
    
    draw: function() 
    {
        this.backgroundImage.draw(0, 0);
        this.foregroundImage.draw(0, 0);

        this.parent();
        
        this.balloonGrid.draw();
        
        this.scoreTitleLabel.draw();
        this.scoreLabel.draw();
        this.ingameUI.draw();
        this.spikeDialog.draw();
        
        if (this.endgameUI.active) this.endgameUI.draw();
        if (this.MainMenuUI.active) this.MainMenuUI.draw();
        if (this.HowToPlayMenuUI.active) this.HowToPlayMenuUI.draw();
        if (this.BasicsHelpUI.active) this.BasicsHelpUI.draw();
        if (this.GameplayHelpUI.active) this.GameplayHelpUI.draw();
        if (this.SkillLevelsHelpUI.active) this.SkillLevelsHelpUI.draw();
        if (this.TipsHelpUI.active) this.TipsHelpUI.draw();
        if (this.OptionsMenuUI.active) this.OptionsMenuUI.draw();
        if (this.AboutScreenUI.active) this.AboutScreenUI.draw();
        
        this.curtain.draw();

        if (this.drawVersion)
        {
            var ctx = ig.system.context;
            var w = ig.system.realWidth;
            var h = ig.system.realHeight;
        
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.textAlign = 'right';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('version 0.23', w - 15, h - 23);
        }
    }
});

ig.main('#canvas', Poppit, 30, 480, 320, 1, EASplashLoader);

});
