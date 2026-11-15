ig.module(
    'game.guiBase.guiBase'
)

.requires(
    'impact.impact'
)
.defines(function() {
    
    GUIBase = ig.Class.extend
    ({
        elements: [],
        curElement: null,
        name: false,
        
        init: function(priority) 
        {
            TouchHandler.instance.registerDelegate(this, priority);
            this.setupUI();
        },
        
        setupUI: function() { },

        SetupLabel: function(label, pos, scaleFactor, alignment, text)
        {
            label.pos = pos;
            label.scale = {x: scaleFactor, y: scaleFactor};
            label.align = alignment;
            label.setText(text);
            this.elements.push(label);
        },

        /////////////////////
        // Updates
        /////////////////////
        clickDown: function(pos)
        {
            var capture = false;
            for (var i = 0; i < this.elements.length; i++)
            {
                if (this.elements[i].clickDown)
                {
                    capture = this.elements[i].clickDown(pos);
                    if (capture)
                    {
                        this.curElement = this.elements[i];
                        break;
                    }
                }
            }
            
            return capture;
        },
        
        clickUp: function(pos)
        {
            if (this.curElement && this.curElement.clickUp)
                this.curElement.clickUp(pos);
            this.curElement = null;
        },
        
        clickMoved: function(pos)
        {
            if (this.curElement && this.curElement.clickMoved)
                this.curElement.clickMoved(pos)
        }
    });
})