ig.module(
    'plugins.fastClearPlugin'
)
.requires(
    'impact.system'
)
.defines(function()
{ "use strict";
    ig.System.inject
    ({
        clear: function(color)
        {
            this.canvas.width = this.canvas.width;
        }
    });
});

