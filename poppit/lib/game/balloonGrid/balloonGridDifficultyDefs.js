ig.module(
    'game.balloonGrid.balloonGridDifficultyDefs'
)

.requires(
    'impact.impact'
)

.defines(function()
{
    DifficultyDefs = [
        {
            PowerupFrequency: [20,50,25,5,0], // index 0 == 0 powerups
            AnvilOrPin: [50,50], 
            PrizeCount: [7,8], // min, max
            PrizeHeight: [3,5] // rows count bottom to top  
        },
        {
            PowerupFrequency: [45,45,10,0,0], // index 0 == 0 powerups
            AnvilOrPin: [50,50], 
            PrizeCount: [8,9], // min, max
            PrizeHeight: [4,7] // rows count bottom to top  
        },
        {
            PowerupFrequency: [75,25,1,0,0], // index 0 == 0 powerups
            AnvilOrPin: [50,50], 
            PrizeCount: [9,10], // min, max
            PrizeHeight: [6,7] // rows count bottom to top  
        }
    ];
});