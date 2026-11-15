ig.module(
    'game.fonts.bmFont'
)

.requires(
    'impact.impact',
    'game.fonts.bmFontImage',
    'game.utils.utils'
)

.defines(function() 
{
    parseVariablesLine = function(line)
    {
        var variablesLine = {};
        
        var subject = line;
        var regex = /([a-zA-Z]+)=(\w+|".*?")/g;

        var m = null;
        while (m = regex.exec(line))
        {
            variablesLine[m[1]] = Utils.getValueFromString(m[2]);
        }

        return variablesLine;
    },
    
    ParseData = ig.Class.extend
    ({
        init: function(line)
        {
            this.parse(line);
        },
        
        parse: function(line)
        {
            //kerning first=76 second=87 amount=-3
            var vars = parseVariablesLine(line);
            for (var left in vars)
                this[left] = vars[left];
        }
    }),
    
    BMKerning = ParseData.extend 
    ({
        /*kerning first=76 second=87 amount=-3*/
        first: 0,
        second: 0,
        amount: 0
    }),
    
    BMChar = ParseData.extend 
    ({
        /*char id=43 x=238 y=228 width=28 height=28 xoffset=3 yoffset=16 xadvance=32 page=0 chnl=0*/ 
        id: 0, 
        x: 0, 
        y: 0, 
        width: 0, 
        height: 0, 
        xoffset: 0, 
        yoffset: 0, 
        xadvance: 0, 
        page: 0, 
        chnl: 0
    }),
    
    BMFont = ig.Class.extend
    ({
        loaded: false,
        failed: false,
        loadCallback: null,
        path: '',
                
        info: {},
        common: {},
        page: {},
        
        image: null,
        
        chars: {},
        kernings: {},
        
        staticInstantiate: function(fontURL)
        {
            return BMFont.cache[fontURL] || null;
        },
        
        init: function(fontURL)
        {
            this.path = fontURL;
            this.load();
        },
        
        addCharacter: function(line)
        {            
            var character = new BMChar(line);
            this.chars[character.id] = character;
        },
        
        addKerning: function(line)
        {
            var kerning = new BMKerning(line);
            this.kernings[kerning.first] = kerning;
        },
        
        binaryFileLoaded: function(fontFile)
        {
            if(fontFile) 
            {                
                var lines = fontFile.Content.split("\n");
                
                this.info = parseVariablesLine(lines[0]);
                this.common = parseVariablesLine(lines[1]);
                this.page = parseVariablesLine(lines[2]);

                this.image = new BMFontImage(Utils.getRootPath(this.path) + this.page.file, this.onload.bind(this));

                var charIndex = 4;
                var charCount = parseInt(lines[3].split("=")[1]);
                
                for (var i = 0; i < charCount; i++)
                    this.addCharacter(lines[charIndex + i]);
                
                var kerningIndex = charIndex + charCount + 1;
                if (lines[kerningIndex-1])
                {
                    var kerningCount = parseInt(lines[kerningIndex-1].split("=")[1]);
                
                    for (var i = 0; i < kerningCount; i++)
                        this.addKerning(lines[kerningIndex + i]);
                }
            } 
            else 
                alert('There was some error while trying to fetch the binary file!');
        },
        
        load: function(loadCallback)
        {
            if( this.loaded )
            {
                if( loadCallback ) loadCallback( this.path, true );
                return;
            }
            else if( !this.loaded && ig.ready ) 
            {
                this.loadCallback = loadCallback || null;
                
                Utils.getBinaryFile(this.path, this);
            }
            else 
            {
                ig.addResource( this );
            }

            BMFont.cache[this.path] = this;
        },
        
        onload: function(event)
        {
            this.loaded = true;

            if( this.loadCallback ) this.loadCallback( this.path, true );
        },
        
        onerror: function( event )
        {
            this.failed = true;

            if( this.loadCallback ) this.loadCallback( this.path, false );
        }
    });
    
    BMFont.cache = {};
})