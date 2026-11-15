ig.module(
    'game.balloonGrid.balloonGridState'
)

.requires(
    'impact.impact',
    
    'game.touchHandler',
    
    'game.balloonGrid.balloonGridCell',
    
    'game.entities.balloon',
    'game.entities.powerupitem',
    'game.entities.prizeitem',
    'game.entities.prize'
)

.defines(function()
{
    BalloonGridState = ig.Class.extend
    ({
        playerScore: 0,
        
        SavedGrid: [],
        cells: [],
        items: [],
        
        curSize: {x: 0, x: 1},
        
        anvilActive: false,
        anvilInUse: false,
        anvilColumn: 0,
        anvilRow: 0,
        anvilBalloonCell: null,
        
        pinActive: false,
        
        pinCount: 0,
        anvilCount: 0,
  
        saveGrid: function(grid)
        {
            this.SavedGrid = [];
            for (var cidx = 0; cidx < grid.length; cidx++)
            {
                var column = grid[cidx];
                var newColumn = [];                    
                for (var ridx = 0; ridx < column.length; ridx++)
                {
                    var saveCell = 
                    {
                        balloonColor: null,
                        itemType: false,
                        prizeNumber: false,
                        powerupType: false
                    };
                    var cell = column[ridx];
                    if (cell.balloon)
                    {
                        saveCell.balloonColor = cell.balloon.color;
                        if (cell.item)
                        {
                            saveCell.itemType = cell.item.itemType;
                            if (cell.item instanceof EntityPrizeItem) saveCell.prizeNumber = cell.item.prizeNumber;
                            else if (cell.item instanceof EntityPowerupItem) saveCell.powerupType = cell.item.powerupType;
                        }
                    }
                    newColumn.push(saveCell);
                }
                this.SavedGrid.push(newColumn);
            }
        },
        
        savePowerUps: function(balloonGrid)
        {        
            this.anvilActive = balloonGrid.anvilActive;
            this.anvilInUse = balloonGrid.anvilInUse;
            this.anvilColumn = balloonGrid.anvilColumn;
            this.anvilRow = balloonGrid.anvilRow;
            this.pinActive = balloonGrid.pinActive;
            this.pinCount = ig.game.ingameUI.pinButton.pinCount;
            this.anvilCount = ig.game.ingameUI.anvilButton.anvilCount;
        },
      
        savePlayer: function()
        {
        },
        
        saveState: function()
        {
            this.playerScore = Player.instance.score;
            this.curSize.x = BalloonGrid.instance.curSize.x;
            this.curSize.y = BalloonGrid.instance.curSize.y;
            this.savePowerUps(BalloonGrid.instance);
            this.saveGrid(BalloonGrid.instance.grid);
        },
        
        restoreGrid: function(grid)
        {                        
            var restoredPrizeIDs = [];
            for (var cidx = 0; cidx < this.SavedGrid.length; cidx++)
            {
                var column = grid[cidx];
                var savedColumn = this.SavedGrid[cidx];       
                for (var ridx = 0; ridx < column.length; ridx++)
                {
                    var cell = column[ridx];
                    var restoredCell = savedColumn[ridx];
                    if (cell.balloon)
                    {
                        cell.killBalloon();
                        cell.removeBalloon();
                    }
                    if (restoredCell.balloonColor != null) cell.createBalloon(restoredCell.balloonColor)
                    if (cell.balloon && !cell.item)
                    {
                        if (restoredCell.itemType)
                        {
                            if (restoredCell.itemType == EntityBalloonItem.TYPE.PRIZE)
                            {
                                cell.restorePrize(restoredCell.prizeNumber);
                                restoredPrizeIDs.push(restoredCell.prizeNumber);
                            }
                            if (restoredCell.itemType == EntityBalloonItem.TYPE.POWERUP) cell.restorePowerup(restoredCell.powerupType);
                        }
                    }
                    }
            }
            for (var i = 0; i < restoredPrizeIDs.length; i++)
            {
                var deadPrize = BalloonGrid.instance.prizes.pop();
                deadPrize.kill();
            }
        },
        
        restorePowerUps: function(balloonGrid)
        {            
            balloonGrid.anvilActive = false;
            balloonGrid.anvilInUse = this.anvilInUse;
            balloonGrid.anvilColumn = this.anvilColumn;
            balloonGrid.anvilRow = this.anvilRow;
            balloonGrid.pinActive = false;
            ig.game.ingameUI.pinButton.setPinCount(this.pinCount);
            ig.game.ingameUI.anvilButton.setAnvilCount(this.anvilCount);
        },
        
        restoreState: function()
        {
            var balloonGrid = BalloonGrid.instance;
            Player.instance.score = this.playerScore;
            balloonGrid.curSize.x = this.curSize.x;
            balloonGrid.curSize.y = this.curSize.y;
            this.restorePowerUps(balloonGrid);
            this.restoreGrid(balloonGrid.grid);
        }
        
    });
});