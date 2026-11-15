ig.module(
    'game.fonts.bmFontLabel'
)
.requires(
    'impact.impact',
    'game.fonts.bmFont'
)
.defines(function()
{
    BMFontLabel = ig.Class.extend
    ({
        active: true,
        pos: {x: 0, y: 0},
        font: null,
        width: 0,
        height: 0,
        spacing: 0,
        text: "",
        scale: {x: 1, y: 1},
        align: 0,
        flip: {x: false, y: false},
        cursorPositions: [],
        chrInfos: [],
        yoff: 0,

        init: function(fontURL, text)
        {
            this.font = new BMFont(fontURL);
            this.chrInfos = [];
        },
        
        setActive: function(active)
        {
            this.active = active;
        },

        setText: function(text)
        {
            text = String(text);
            if (this.text === text) return;
            this.chrInfos = [];
            this.cursorPositions = [];

            this.text = String(text);
            var width = 0;
            var height = 0;
            var narrow = 10000;
            
            for (var i = 0; i < this.text.length; i++)
            {
                var chr = this.font.chars[parseInt(this.text[i].charCodeAt(0))];
                if (!chr)
                {
                    //console.log("BMFontLabel.setText() no character in font glyphs for " + this.text[i]);
                    chr = this.font.chars[parseInt(' '.charCodeAt(0))];
                }
                width += chr.xadvance + chr.xoffset + this.spacing;
                var h = chr.height + chr.yoffset;
                if (height < h) height = h;
                if (narrow > chr.width) narrow == chr.width
                this.chrInfos.push(chr);
            }

            this.width = width;
            this.height = height;

            var cursorPos = {x: 0, y: 0};
            var xOffset = -this.width * (0.5 * this.align);
            cursorPos.x += xOffset;
            for (var j = 0; j < this.text.length; j++)
            {
                var chr = this.font.chars[parseInt(this.text[j].charCodeAt(0))];
                if (!chr)
                {
                    //console.log("BMFontLabel.setText() no character in font glyphs for " + this.text[i]);
                    chr = this.font.chars[parseInt(' '.charCodeAt(0))];
                }
                var cp = { x: cursorPos.x + 0, y: cursorPos.y + 0};
                this.cursorPositions.push(cp);
                cursorPos.x += chr.xadvance + this.spacing;
            }
            
            var ctx = ig.system.context;
            ctx.save();
            this.trans.x = ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x);
            this.trans.y = ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y);
            ctx.translate(this.trans.x, this.trans.y);
            ctx.restore();
        },
        
        trans: {x: 0, y: 0},
        
        draw: function()
        {
            if (!this.active) return;
            var ctx = ig.system.context;
            ctx.save();
            ctx.translate(this.trans.x, this.trans.y);
            ctx.scale(this.scale.x, this.scale.y);
            var ccc = "";
            for (var i = 0; i < this.text.length; i++)
            {
                this.font.image.drawTile
                (
                    this.cursorPositions[i].x + this.chrInfos[i].xoffset,
                    this.cursorPositions[i].y + this.chrInfos[i].yoffset + this.yoff,
                    this.chrInfos[i].x,
                    this.chrInfos[i].y,
                    this.chrInfos[i].width,
                    this.chrInfos[i].height,
                    this.flip.x,
                    this.flip.y
                );
            }
            ctx.restore();
        }        
    });
    
    BMFontLabel.ALIGN = 
    {
        LEFT: 0,
        CENTER: 1,
        RIGHT: 2
    }
    
});