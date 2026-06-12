{
	
	// Definitions for the game...
	"def":{
		// the URIs for the properties files.
		"properties":{
			"universal":"json/def.properties.js",
			"locale":"json/def_en.properties.js"			
		}
	},
	
	
	// The location of the Tubmlebees game swf
	"swfs":{
		"mod_game":"TB2Main.swf"
	},
	
	
	// Externally loaded png files for image fonts.
	"pngs":{
		
		// font that appears in the hexes
		"hex_font":"fonts/hex_font.png",
		
		// font that appears in the "your word" field
		"myword_font":"fonts/myword_font.png"
		
	},
	
	// The link to which the user will be sent when clicking one of the pogo buttons.
	// Append the tracking code in query string notation here.
	"pogoURL":"http://word-games.pogo.com/games/tumble-bees",
	"pogoTrackingStrings":{
		
		// called from the instructions screen pre-game
		"instructions":"?sourceid=extrnl_tumblebee_instruct1_pregame_kongregate",
		
		// called from the "fill the jar" screen pre-game
		"fillJarPrompt":"?sourceid=extrnl_tumblebee_instruct2_pregame_kongregate",
		
		// called from the screen before bonus round
		"miniBonusPrompt":"?sourceid=extrnl_tumblebee_congrats_midgame_kongregate",
		
		// called from the "that's as far as this game goes" screen
		"buyGamePrompt":"?sourceid=extrnl_tumblebee_bonuscongrats_endgame_kongregate"
		
	},
	
	// The URI for the list of legal words.
	"wordlist":"dict/dict.dat"
	
}