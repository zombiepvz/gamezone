//A recreation of def_en.properties
{	
	"game":{
		
		// This string represents a mapping for any bitmap font that might be loaded into the game.  The bitmapLetterString
		// assumes that any bitmap font is laid out such that the letters in the font map directly to the characters in the string.
		// please note the escape characters.
		"bitmapLetterString":"!\"$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ `~abcdefghijklmnopqrstuvwxyz",
		
		"letterRatio":{
			//letters in the letters array must be UPPERCASE
			//the numbers in the counts array reflect the number of hexes representing each character can be in the bag.
			"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","*"],
			"counts": [ 7 , 2 , 2 , 4 ,10 , 2 , 3 , 2 , 7 , 1 , 1 , 4 , 2 , 6 , 6 , 2 , 1 , 6 , 4 , 6 , 4 , 2 , 2 , 1 , 2 , 1 , 3 ]
		},
		
		"comboLetters":{
			//all letters must be UPPERCASE
			"Q":"QU"
		},
		
		"forceTokenBonus":[
			//all letters must be UPPERCASE
			"X","Q","Z"
		],
		
		"forceBlockClear":[
			//all letters must be UPPERCASE
			"Z","X","Q","J"
		],
		
		// The location of the help files, accessable by clicking the help button.
		"helpURL":"help/index.html",
		
		// The character to be used as the wild char for wild tiles.
		"wildChar":"*"
		
	}
}