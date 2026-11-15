ig.module(
    'game.localizedStrings'
)

.requires(
    'impact.impact',
    'game.utils.utils'
)

.defines(function() 
{
    LocalizedStrings = ig.Class.extend
    ({
        loaded: false,
        failed: false,
        loadCallback: null,
        path: '',

        staticInstantiate: function()
        { 
            if(LocalizedStrings.instance == null)
                return null;
            else 
                return LocalizedStrings.instance;
        },

        init: function(stringLanguage)
        {
            var stringsPath = '';
			var current_language = 'en';  
			var valid_languages = new Array('en','es','pt','pl'); 
			
			if ( valid_languages.indexOf(stringLanguage) != -1) current_language = stringLanguage;
			stringsPath = 'media/strings/Poppit_' + current_language + '.json';
			
			LocalizedStrings.instance = this;
            this.path = stringsPath;
            this.load();
        },

        binaryFileLoaded: function(stringsFile)
        {
            if(stringsFile) 
            {   
                var strings = JSON.parse(stringsFile.Content);
                
                for (var key in strings)
                {
                    AllStrings[key] = strings[key];
                }
                    
                this.loaded = true;
                if( this.loadCallback ) this.loadCallback( this.path, true );
            } 
            else 
                alert('There was some error while trying to fetch the binary file!');
        },

        load: function(loadCallback)
        { 
            if(this.loaded)
            {
                if(loadCallback) loadCallback(this.path, true);
                return;
            }
            else if(!this.loaded && ig.ready)
            {
                this.loadCallback = loadCallback || null;
                Utils.getBinaryFile(this.path, this);
            }
            else 
            {
                ig.addResource( this );
            }
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

    AllStrings = {};
})
