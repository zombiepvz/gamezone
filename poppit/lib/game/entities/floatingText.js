
var floaterCounterThingy = 0;

ig.module(
    'game.entities.floatingText'
)

.requires(
    'game.entities.extendedEntity',
    'game.fonts.bmFont',
    'game.fonts.bmFontLabel',
    
    'game.utils.utils'
)

.defines(function()
{    
    EntityFloatingText = ExtendedEntity.extend
    ({
        life: 5,
        speed: 60,
        text: "",
        label: null,
        yOffset: 0,

        init: function(x, y, settings) 
        {
            this.label = new BMFontLabel('media/fonts/FullAntiqueOlive38.fnt', "0");
            this.parent(x, y, settings);
            this.label.pos = {x: x, y: y};
            this.label.scale = {x: 0.6, y: 0.6};
            this.label.align = BMFontLabel.ALIGN.CENTER;
            this.zIndex = 6;
            this.floaterID = floaterCounterThingy++;
        },
        
        setText: function(text)
        {
            this.text = text;
            this.label.setText(this.text);
        },
        
        update: function()
        {
            this.parent();
            this.life -= ig.system.tick;
            this.yOffset -= ig.system.tick * this.speed;
            this.label.yoff = this.yOffset;
            if (this.life <= 0)
            {
                this.kill();
                this.yOffset = 0;
            }
        },
        
        draw: function()
        {
            this.parent();
            this.label.draw();
        }
    });
});