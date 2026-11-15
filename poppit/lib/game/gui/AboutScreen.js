ig.module(
    'game.gui.AboutScreen'
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
    AboutScreen = GUIPopup.extend
    ({
        BackgroundImage: new ig.Image('media/images/menu/PoppitMenuBkg.png'),

        BackButton: null,
        BackLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),

        TitleLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
	
	AboutFilename: null,

        SetupLabel: function(label, pos, scaleFactor, alignment, text)
        {
            label.pos = pos;
            label.scale = {x: scaleFactor, y: scaleFactor};
            label.align = alignment;
            label.setText(text);
            this.elements.push(label);
        },

        setupUI: function()
        {
            var backButtonFactory = new ButtonFactory('media/images/menu/back_button2.png', 87, 36);
            backButtonFactory.buttonSize = {x: 87, y:36};
            this.BackButton = backButtonFactory.createButton(0, 10, 10);
            this.BackButton.onTrigger = function()
            {
                ig.game.AboutScreenUI.ShowDiv(false);
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.MainMenuUI.show();
                    ig.game.AboutScreenUI.hide();
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
	    
	    this.SetupLabel(this.TitleLabel,    {x: 324, y: 28}, 0.7, BMFontLabel.ALIGN.CENTER, AllStrings["aboutText"]);
	    
            var lang = "";
            lang = navigator.language.substring(0,2);
            if (lang == 'pt') lang = 'PT';
	    if (lang == 'en') lang = '';
	    if (lang == 'es') lang = 'ES';
		if (lang == 'pl') lang = 'PL';
	    
	    this.AboutFilename = 'PoppitAbout'+ lang +'.html';
            
            this.parent();
        },

	WrappedDivID: false,
        ShowDiv: function(show)
        {
            if (show)
            {
                var html = false;
                this.WrappedDivID = JSG_CreateDiv("AboutDiv", html, 210, 220, 220, 80);
                var fn = "media/strings/" + this.AboutFilename;
                $("#AboutDiv").load(fn);
            }
            else
            {
                var doc = content.document;
                var body = doc.body;
                var div = doc.getElementById(this.WrappedDivID);
                if (div) body.removeChild(div);
            }
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
