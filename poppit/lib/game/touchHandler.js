ig.module(
    'game.touchHandler'
)

.requires(
    'impact.impact'
)

.defines(function()
{
    TouchHandler = ig.Class.extend
    ({        
        clickBind: 'click',
        
        defaultPriority: 0,
        priorities: [],
        prioritizedDelegates: {},
        
        clickedDown: false,
        
        capturedTouch: null,
        
        staticInstantiate: function()
        {
            if( TouchHandler.instance == null )
                return null;
            else 
                return TouchHandler.instance;
        },

        init: function() 
        {
            TouchHandler.instance = this;
            ig.input.bind( ig.KEY.MOUSE1, this.clickBind );
        },
        
        findDelegate: function(delegate)
        {
            var location = null;
            
            for (var i = 0; i < this.priorities.length; i++)
            {
                var priority = this.priorities[i];
                for (var j = 0; j < this.prioritizedDelegates[priority].length; j++)
                {
                    if (this.prioritizedDelegates[priority][j] === delegate)
                    {
                        location = {
                            delegatePriority: priority,
                            delegateIndex: j,
                            delegate: this.prioritizedDelegates[priority][j]
                        }
                        
                        break;
                    }
                }
                
                if (location)
                    break;
            }
            
            return location;
        },
        
        registerDelegate: function(delegate, priority)
        {
            this.unregisterDelegate(delegate);
            
            if (priority === undefined) priority = this.defaultPriority;
            
            if (!this.prioritizedDelegates[priority])
            {
                this.prioritizedDelegates[priority] = [];
                this.priorities.push(priority);
            }
            
            this.prioritizedDelegates[priority].push(delegate);
            this.priorities.sort();
        },
        
        unregisterDelegate: function(delegate)
        {
            var location = this.findDelegate(delegate);
            
            if (location)
                this.prioritizedDelegates[location.delegatePriority].splice(location.delegateIndex, 1);
        },
        
        dispatchTouch: function(delegate)
        {
            if (ig.input.pressed(this.clickBind))
            {
                if (delegate.clickDown)
                {
                    var capture = delegate.clickDown(ig.input.mouse);
                    if (capture)
                        this.capturedTouch = delegate;
                }
            }
            else if (ig.input.released(this.clickBind))
            {
                if (delegate.clickUp)
                    delegate.clickUp(ig.input.mouse);
            }
            else if (this.clickedDown)
            {
                if (delegate.clickMoved)
                    delegate.clickMoved(ig.input.mouse);
            }
        },
        
        update: function()
        {
            if (ig.input.pressed(this.clickBind))
                this.clickedDown = true;

            if (ig.input.released(this.clickBind) && this.clickedDown)
                this.clickedDown = false;
            
            if (this.capturedTouch)
                this.dispatchTouch(this.capturedTouch);
            else
            {
                for (var i = 0; i < this.priorities.length; i++)
                {
                    var priority = this.priorities[i];
                    for (var j = 0; j < this.prioritizedDelegates[priority].length; j++)
                    {
                        this.dispatchTouch(this.prioritizedDelegates[priority][j]);
                        if (this.capturedTouch)
                            break;
                    }
                    if (this.capturedTouch)
                        break;
                }
            }
            
            if (!this.clickedDown)
                this.capturedTouch = null;
        }
    });
});