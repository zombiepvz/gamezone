ig.module(
    'game.gui.TipsHelp'
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
    TipsHelp = GUIPopup.extend
    ({
        BackgroundImage: new ig.Image('media/images/menu/PoppitMenuBkg.png'),

        BackButton: null,

        MainLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        BackLabel: new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', ""),
        
        HelpFileName: null,

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
            
            this.HelpFileName = areas["helpTips"]["htmlFilename"];
            //console.log("TIPS FILENAME: " + this.HelpFileName);
            
            this.MainLabel.pos = {x: 324, y: 28};
            this.MainLabel.scale = {x: 0.7, y: 0.7};
            this.MainLabel.align = BMFontLabel.ALIGN.CENTER;
            this.MainLabel.setText(areas["helpTips"]["title"]);
            this.elements.push(this.MainLabel);
            
            var backButtonFactory = new ButtonFactory('media/images/menu/back_button2.png', 87, 36);
            backButtonFactory.buttonSize = {x: 87, y:36};
            this.BackButton = backButtonFactory.createButton(0, 10, 10);
            this.BackButton.onTrigger = function()
            {
                ig.game.TipsHelpUI.ShowDiv(false);
                ig.game.curtain = new CurtainTransition();
                ig.game.curtain.onClosed = function()
                {
                    ig.game.HowToPlayMenuUI.show();
                    ig.game.TipsHelpUI.hide();
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
            
            this.parent();
        },

        WrappedDivID: false,
        ShowDiv: function(show)
        {
            if (show)
            {
                var html = false;
                this.WrappedDivID = JSG_CreateDiv("TipsDiv", html, 210, 220, 190, 80);
                var fn = "media/strings/" + this.HelpFileName;
                $("#TipsDiv").load(fn);
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
