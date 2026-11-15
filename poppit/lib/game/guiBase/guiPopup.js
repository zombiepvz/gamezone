ig.module(
    'game.guiBase.guiPopup'
)

.requires(
    'impact.impact',
    
    'game.guiBase.guiBase'
)
.defines(function()
{    
    GUIPopup = GUIBase.extend
    ({
        active: false,
        
        init: function(priority) 
        {
            GUIPopup.topPriority--;
            if (priority === undefined) priority = GUIPopup.topPriority;
            TouchHandler.instance.registerDelegate(this, priority);
            this.setupUI();
        },
        
        setupUI: function()
        {                        
            this.updateActive();
        },
        
        clickDown: function(pos)
        {    
            if (this.active)
            {
                this.parent(pos);
                return true;
            }
            else return false;
        },
        
        updateActive: function() { },
        
        show: function()
        {
            this.active = true;
            this.updateActive();
        },
        
        hide: function()
        {
            this.active = false;
            this.updateActive();
        },
        
        update: function() { },
        
        draw: function()
        {
            if (this.active) { }
        }
    });
    
    GUIPopup.topPriority = 0;
});