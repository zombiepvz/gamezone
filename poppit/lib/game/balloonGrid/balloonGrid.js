ig.module(
    'game.balloonGrid.balloonGrid'
)

.requires(
    'impact.impact',
    
    'game.touchHandler',
    
    'game.balloonGrid.balloonGridBounceHelper',
    'game.balloonGrid.balloonGridCell',
    'game.balloonGrid.balloonGridDifficultyDefs',
    'game.balloonGrid.balloonGridState',
    
    'game.entities.balloon',
    'game.entities.powerupitem',
    'game.entities.prizeitem',
    'game.entities.prize',
    
    'game.utils.utils',
    'game.utils.vec2'
)

.defines(function()
{   
    BalloonGrid = ig.Class.extend
    ({        
        undoStack: [],
        
        grid: [],
        cells: [],
        selectedCell: null,
        selectedBalloons: [],
        
        balloonsLeft: 0,
        movesLeft: false,
                
        items: [],
        prizes: [],
        
        prizeCount: 19,
        availablePrizes: [],
        
        noPrizesFalling: true,
        noPrizesShowing: true,
        
        powerupSheet: new ig.AnimationSheet('media/images/balloons/powerups.png', 23, 27),
        anvilAnim: null,
        
        anvilActive: false,
        anvilInUse: false,
        anvilColumn: 0,
        anvilRow: 0,
        anvilBalloonCell: null,
        
        pinActive: false,
        
        difficultyDef: null,
        
        position: {x: 133, y: 6},
        size: {x: 10, y: 7},
        curSize: {x: 10, y: 7},
        
        padding: {x: 35, y: 37}, 
        
        clickedDown: false,
        
        popSound: new ig.Sound('media/sounds/balloon-pop.mp3'),
        superPopSound: new ig.Sound('media/sounds/superpop.mp3'),
        errorSound: new ig.Sound('media/sounds/error.mp3'),
        powerupSound: new ig.Sound('media/sounds/powerup.mp3'),
        weightSound: new ig.Sound('media/sounds/weight.mp3'),
        
        idle: 0,
        
        balloonBounceHelper: new BalloonBounceHelper(),
        
        // ImpactJS defers its kills, so if an entity is killed this frame it will still display this frame.
        // This delay prevents the new grid from displaying over the old grid before the it has been sufficiently destroyed.
        needsPopulated: false,
        needsPopulatedFrameCount: 0,
        needsPopulatedFrameDelay: 1,
        
        endGameTime: null,
        showScoreTime: null,
        
        staticInstantiate: function()
        {
            if(BalloonGrid.instance == null) return null;
            else return BalloonGrid.instance;
        },

        init: function(xSize, ySize) 
        {
            BalloonGrid.instance = this;
            this.size.x = xSize;
            this.size.y = ySize;
            this.grid = [];
            TouchHandler.instance.registerDelegate(this, 2);
            this.anvilAnim = new ig.Animation( this.powerupSheet, 0.1, [EntityPowerupItem.POWERUP.ANVIL]);
        },
        
        /////////////////////
        // Powerups
        /////////////////////
        clearPowerups: function()
        {
            this.cancelPin();
            this.cancelAnvil();
            this.anvilInUse = false;
            ig.game.ingameUI.anvilButton.reset();
            ig.game.ingameUI.pinButton.reset();
        },
        
        cancelPin: function()
        {
            this.pinActive = false;
            ig.game.ingameUI.pinButton.setToggled(false);
        },
        
        usePin: function()
        {
            this.cancelPin();
            ig.game.ingameUI.pinButton.removePin();
        },
        
        addPin: function()
        {
            ig.game.ingameUI.pinButton.addPin();
        },
        
        cancelAnvil: function()
        {
            this.anvilActive = false;
            ig.game.ingameUI.anvilButton.setToggled(false);
        },
        
        canUseAnvil: function(columnIndex)
        {
            return !this.grid[columnIndex][this.size.y-2].balloon;
        },
        
        useAnvil: function(columnIndex)
        {
            if (!this.canUseAnvil(columnIndex)) return;
            this.anvilInUse = true;
            this.anvilColumn = columnIndex;
            
            this.weightSound.play();
            
            var column = this.grid[columnIndex];
            var row = 0;
            for (var i = column.length - 2; i >= 0; i--)
            {
                var cell = column[i];
                var newCell = column[i+1];
                if (cell.balloon) cell.balloon.deselect();
                else row++;
                newCell.insertBalloon(cell.balloon);
                cell.removeBalloon();
            }
            this.anvilRow = column.length - row;
            this.anvilBalloonCell = column[0];
            this.anvilBalloonCell.createBalloon(EntityBalloon.COLORS.ANVIL);
            this.cancelAnvil();
            ig.game.ingameUI.anvilButton.removeAnvil();
        },
        
        addAnvil: function()
        {
            ig.game.ingameUI.anvilButton.addAnvil();
        },
        
        /////////////////////
        // The Grid
        /////////////////////            
        createGridCells: function()
        {
            this.balloonBounceHelper.reset();
            for (var i = 0; i < this.size.x; i++)
            {
                var column = [];
                for (var j = 0; j < this.size.y; j++)
                {                   
                    var cell = new BalloonGridCell(i, j);
                    this.cells.push(cell);
                    column.push(cell);
                }
                this.grid.push(column);
            }
        },
        
        createPrizes: function()
        {
            var prizeCount = Utils.getRandomValueFromRangeTable(this.difficultyDef.PrizeCount);
            var i = 0;
            while (i < prizeCount)
            {
                var x = Utils.random(this.grid.length);
                var y = this.grid[0].length - Utils.getRandomValueFromRangeTable(this.difficultyDef.PrizeHeight);
                var cell = this.getCellAt(x,y);
                if (!cell.item)
                {
                    cell.createPrize();
                    i++;
                }
            }
        },
        
        createPowerups: function()
        {
            var powerupPool = [
                EntityPowerupItem.POWERUP.ANVIL,
                EntityPowerupItem.POWERUP.PIN,
                EntityPowerupItem.POWERUP.PIN
            ];
            
            var powerupCount = Utils.getRandomIndexFromProbabilityTable(this.difficultyDef.PowerupFrequency);
            
            while (powerupCount > 0)
            {
                var x = Utils.random(this.grid.length);
                var y = this.grid[0].length - Utils.getRandomValueFromRangeTable(this.difficultyDef.PrizeHeight);
                var cell = this.getCellAt(x,y);
                if (!cell.item)
                {
                    var powerupType = Utils.getRandomElementFromTableAndRemove(powerupPool);
                    cell.createPowerup(powerupType);
                    powerupCount--;
                }
            }
        },
        
        populateGrid: function()
        {
            this.createGridCells();
            this.createPrizes();
            this.createPowerups();
            this.needsPopulated = false;
            this.needsPopulatedFrameCount = 0;
            ig.game.sortEntitiesDeferred();
        },
        
        clearGrid: function()
        {
            for (var i = 0; i < this.cells.length; i++) this.cells[i].killBalloon();
            for (var i = 0; i < this.items.length; i++) this.items[i].kill();
            for (var i = 0; i < this.prizes.length; i++) this.prizes[i].kill();
            
            this.undoStack = [];
            this.items = [];
            this.grid = [];
            this.cells = [];
            this.prizes = [];
            this.availablePrizes = [];

            for(var i = 0; i < this.prizeCount; i++)
            {
                this.availablePrizes.push(i);
            }
        },
        
        resetGrid: function()
        {
            Player.instance.reset();
            this.idle = 0;
            this.curSize.x = this.size.x;
            this.curSize.y = this.size.y;
            this.difficultyDef = DifficultyDefs[Player.instance.difficulty];
            ig.game.target.hide();
            this.clearGrid();
            this.clearPowerups();
            ig.game.gameover = false;
            this.needsPopulated = true;
        },
        
        undo: function()
        {
            if (this.endGameTime) this.endGameTime.pause();
            if (this.showScoreTime) this.showScoreTime.pause();
            this.endGameTime = null;
            this.showScoreTime = null;
            ig.game.gameover = false;
            var state = this.undoStack.pop();
            if (state) state.restoreState();
        },
        
        getGridPixelPosition: function(x, y)
        {
            var xoffset = (this.size.x - this.curSize.x) * (this.padding.x/2);
            var yoffset = this.balloonBounceHelper.getYOffset(x);
            var pos = new Vec2(
                (this.position.x + xoffset) + x * this.padding.x, 
                (this.position.y + yoffset) + y * this.padding.y
            );
            return pos;
        },
        
        clearVisitedBalloons: function()
        {
            for (var i = 0; i < this.cells.length; i++)
            {
                var cell = this.cells[i];
                cell.visited = false;
            }
        },
        
        getEdgeBalloonsR: function(x, y, color, selectedBalloons, depth)
        {
            var cell = this.getCellAt(x,y);
            if (cell && cell.balloon && cell.balloon.color == color && !cell.visited)
            {
                selectedBalloons.push(cell);
                cell.visited = true;
                if (depth && --depth == 0) return;
                var intPos = {
                    x: parseInt(cell.x), 
                    y: parseInt(cell.y)
                };
                var nextX = intPos.x;
                var nextY = intPos.y;
                nextX = intPos.x - 1;
                this.getEdgeBalloonsR(nextX, cell.y, color, selectedBalloons, depth);
                nextX = intPos.x + 1;
                this.getEdgeBalloonsR(nextX, cell.y, color, selectedBalloons, depth);
                nextX = intPos.x;
                nextY = intPos.y - 1;
                this.getEdgeBalloonsR(cell.x, nextY, color, selectedBalloons, depth);
                nextY = intPos.y + 1;
                this.getEdgeBalloonsR(cell.x, nextY, color, selectedBalloons, depth);
            }
        },
        
        getEdgeBalloons: function(cell, selectedBalloons, depth)
        {
            this.getEdgeBalloonsR(cell.x, cell.y, cell.balloon.color, selectedBalloons, depth);
            this.clearVisitedBalloons();
        },
        
        /////////////////////
        // Balloons
        /////////////////////
        getCellAt: function(x, y)
        {                
            if (x >= 0 && 
                y >= 0 && 
                x < this.grid.length && 
                y < this.grid[x].length)
            {
                cell = this.grid[x][y];
            }
            
            return cell;
        },
        
        spawnPrize: function(item)
        {
            var prize = ig.game.spawnEntity(EntityPrize, item.pos.x, item.pos.y);
            prize.setPrize(item.prizeNumber);
            this.prizes.push(prize);
        },
        
        checkBalloonItems: function()
        {
            var win = true;
            for (var i in this.items)
            {
                var item = this.items[i];
                if (item.state == EntityBalloonItem.STATES.ALIVE)
                {
                    if (!item.cell.balloon)
                    {
                        item.currentAnim = null;
                        item.state = EntityBalloonItem.STATES.DEAD;
                        item.cell.removeItem();
                        if (item instanceof EntityPrizeItem) this.spawnPrize(item);
                        else if (item instanceof EntityPowerupItem)
                        {                     
                            if (item.powerupType == EntityPowerupItem.POWERUP.ANVIL) this.addAnvil();
                            else if (item.powerupType == EntityPowerupItem.POWERUP.PIN) this.addPin();
                            this.powerupSound.play();
                        }
                    }
                    else if (item instanceof EntityPrizeItem) win = false;
                }
            }
            
            if (!Player.instance.win && win)
            {
                Player.instance.win = win;
                ig.game.spike.setState(EntitySpike.STATES.JUMPS);
            }
        },
        
        resetEndGame: function()
        {
            if (this.endGameTime) this.endGameTime.set(5);
        },
        
        gameCanEnd: function()
        {
            return ((this.noPrizesFalling || this.noPrizesShowing) &&
                    (ig.game.player.win || !this.movesLeft) &&
                    (ig.game.ingameUI.pinButton.pinCount == 0 || ig.game.player.win) &&
                    (ig.game.player.win || (this.anvilInUse || ig.game.ingameUI.anvilButton.anvilCount == 0)) &&
                    (!this.anvilActive || !this.pinActive));
        },
        
        gameCanEndImmediate: function()
        {
            return ((!ig.game.player.win && !this.movesLeft) &&
                    (ig.game.ingameUI.pinButton.pinCount == 0 && ig.game.ingameUI.anvilButton.anvilCount == 0) &&
                    (!this.anvilActive || !this.pinActive));
        },
        
        checkForMoreMoves: function()
        {
            var balloonsLeft = 0;
            var movesLeft = false;
            for (var i = 0; i < this.cells.length; i++)
            {
                var cell = this.cells[i];
                if (cell.balloon)
                {
                    balloonsLeft++;
                    var edges = [];
                    this.getEdgeBalloons(cell, edges, 2);
                    if (edges.length > 1) movesLeft = true;
                }
            }
            this.movesLeft = movesLeft;
            this.balloonsLeft = balloonsLeft;
            if (!this.movesLeft && (ig.game.ingameUI.pinButton.pinCount == 0 || ig.game.player.win))
            {
                ig.game.spike.setState(EntitySpike.STATES.SHRUGS);
                if (!this.endGameTime) this.endGameTime = new ig.Timer();
                this.resetEndGame();
            }
        },
        
        updateGridRows: function()
        {
            for (var cidx = 0; cidx < this.grid.length; cidx++)
            {
                var column = this.grid[cidx];
                var emptyRows = 0;
                for (var ridx = 0; ridx < column.length; ridx++)
                {
                    var cell = column[ridx];
                    if (cell.balloon)
                    {
                        if (emptyRows > 0)
                        {
                            var newCell = column[ridx - emptyRows];
                            newCell.insertBalloon(cell.balloon);
                            cell.removeBalloon();
                        }                        
                    }
                    else emptyRows++;
                }
            }
        },
        
        updateGridColumns: function()
        {           
            var emptyColumns = 0;
            for (var cidx = 0; cidx < this.grid.length; cidx++)
            {
                var column = this.grid[cidx];
                var newColumn = this.grid[cidx - emptyColumns];
                var columnEmpty = true;
                for (var ridx = 0; ridx < column.length; ridx++)
                {
                    var cell = column[ridx];
                    if (cell.balloon)
                    {
                        columnEmpty = false;
                        if (emptyColumns > 0)
                        {
                            var newCell = newColumn[ridx];
                            newCell.insertBalloon(cell.balloon);
                            cell.removeBalloon();
                            if (cell.item)
                            {
                                newCell.insertItem(cell.item);
                                cell.removeItem();
                            }
                        }
                    }
                }
                if (columnEmpty) emptyColumns++;
            }
            this.curSize.x = this.size.x - emptyColumns;
        },
        
        popBalloons: function()
        {
            this.resetEndGame();
            var balloonsToPop = this.selectedBalloons.length;
            var balloonsPopped = 0;
            var anvilRowPopped = false;
            if (this.anvilActive || balloonsToPop > 1 || this.pinActive)
            {
                var state = new BalloonGridState();
                state.saveState();
                this.undoStack.push(state);
            }
            var updateGrid = false;
            if (this.anvilActive)
            {
                if (this.selectedCell && this.selectedCell.balloon)
                {                    
                    this.cancelAnvil();
                    this.useAnvil(this.selectedCell.x);
                    this.endGameTime = null;
                    updateGrid = true;
                }
            }
            else if (balloonsToPop > 1 || this.pinActive)
            {
                if (this.pinActive) balloonsToPop = 1;
                for (var i = 0; i < balloonsToPop; i++)
                {
                    var cell = this.selectedBalloons[i];
                    if (cell.balloon)
                    {
                        if (this.pinActive) this.usePin();
                        cell.balloon.pop();
                        cell.balloon = null;
                        balloonsPopped++;
                        if (this.anvilColumn == cell.x) anvilRowPopped = true;
                    }                        
                }
                if (balloonsPopped >= 5)
                {
                    this.superPopSound.play();
                    var points = Player.instance.balloonsPopped(balloonsToPop);
                    var floatingText = ig.game.spawnEntity(EntityFloatingText, 320, 230);
                    floatingText.setText(AllStrings["superPopScoreTextString"].replace("%i", points.toString()));
                    ig.game.spike.setState(EntitySpike.STATES.EXCITED);
                }
                else if (balloonsPopped > 0) this.popSound.play();
                if (anvilRowPopped && this.anvilBalloonCell)
                {
                    if (this.anvilBalloonCell.balloon)
                    {
                        this.anvilBalloonCell.balloon.kill();
                        this.anvilBalloonCell.balloon = null;
                    }
                    this.anvilBalloonCell = null;
                    this.anvilInUse = false;
                }
                updateGrid = true;
            }
            else if (this.selectedCell) this.errorSound.play();
            if (updateGrid)
            {
                this.updateGridRows();
                this.checkBalloonItems();
                this.updateGridColumns();
                this.checkForMoreMoves();    
            }
            this.cancelPin();    
            this.cancelAnvil();
            this.deselectBalloons();
        },
        
        selectBalloons: function(x, y)
        {
            var cell = this.getCellAt(x,y);
            this.selectedCell = cell;
            this.getEdgeBalloons(cell, this.selectedBalloons);
            var balloonCount = (this.pinActive || this.anvilActive) ? 1 : this.selectedBalloons.length;
            for (var i = 0; i < balloonCount; i++)
            {
                if (this.selectedBalloons[i].balloon.state != EntityBalloon.STATES.SELECTED && !this.selectedBalloons[i].balloonNeedsMoved)
                {
                    this.selectedBalloons[i].balloon.select();
                }
            }           
        },
        
        deselectBalloons: function()
        {           
            for (var i = 0; i < this.selectedBalloons.length; i++)
            {
                if (this.selectedBalloons[i].balloon && this.selectedBalloons[i].balloon.state == EntityBalloon.STATES.SELECTED)
                {
                    this.selectedBalloons[i].balloon.deselect();
                }
            }
            this.selectedCell = null;
            this.selectedBalloons = [];
        },
        
        checkActivePrizes: function()
        {
            this.noPrizesFalling = true;
            this.noPrizesShowing = true;
            for (var i = 0; i < this.prizes.length; i++)
            {
                if (this.prizes[i].falling) this.noPrizesFalling = false;
                if (this.prizes[i].currentAnim) this.noPrizesShowing = false;
            }
        },
        
        dropPrizes: function()
        {
            var minX = 142;
            var maxX = 450;
            var offset = (maxX - minX) / this.prizes.length;
            for (var i = 0; i < this.prizes.length; i++)
            {
                var prize = this.prizes[i];
                prize.maxTimeOnGround = 5;
                prize.prizeSpeed = 80;
                prize.pos = 
                {
                    x: minX + (offset * i), 
                    y: 32 - Utils.random(50)
                }
                prize.resetPrizeAnim();
            }
        },
        
        /////////////////////
        // Updates
        /////////////////////
        clickDown: function(pos)
        {   
            if (ig.game.gameover) return false;
            if (this.clickedDown) return false;
            this.clickedDown = true;
            return true;
        },
        
        clickUp: function(pos)
        {
            if (!this.clickedDown) return;
            this.clickedDown = false;
            this.popBalloons();
        },
        
        clickMoved: function(pos)
        {            
            this.idle = 0;
            if (!this.clickedDown) return;
            if (this.selectedCell && this.selectedCell.balloon)
            {
                var selectedFocus = this.selectedCell.balloon.containsPoint(pos.x, pos.y);
                if (!selectedFocus) this.deselectBalloons();
            }
            
            for (var i = 0; i < this.cells.length; i++)
            {
                var cell = this.cells[i];
                if (!cell || !(cell.balloon instanceof EntityBalloon)) continue;
                cell.balloon.focusInside = cell.balloon.containsPoint(pos.x, pos.y);
                if (cell.balloon.focusInside && this.selectedCell == null) this.selectBalloons(cell.x, cell.y);
                else if (this.selectedCell && !this.selectedCell.balloon.focusInside) this.deselectBalloons();
            }
        },
        
        update: function()
        {            
            this.checkActivePrizes();
            if (this.noPrizesFalling || this.noPrizesShowing || ig.game.gameover) ig.game.target.hide();
            else ig.game.target.show();
            if ((this.endGameTime && this.endGameTime.delta() >= 0 && this.gameCanEnd()) || (this.endGameTime && this.gameCanEndImmediate()))
            {
                ig.game.gameover = true;
                if (!this.showScoreTime)
                {
                    this.showScoreTime = new ig.Timer();
                    this.showScoreTime.set(5);
                }
                if (ig.game.player.win)
                {
                    this.dropPrizes();
                    ig.game.spike.setState(EntitySpike.STATES.WINK);
                }
                
                this.endGameTime = null;
            }
            
            if (ig.game.gameover && this.showScoreTime && this.showScoreTime.delta() >= 0)
            {
                if (ig.game.player.win)
                {
                    ig.game.player.calculateFinalScore();
                    ig.game.endgameUI.show();
                }
                else
                {
                    var text = AllStrings["endOfGameFailed"];
                    text = text.replace("%i", BalloonGrid.instance.prizes.length);
                    text = text.replace("%i", BalloonGrid.instance.prizeCount - BalloonGrid.instance.availablePrizes.length);
                    ig.game.spikeDialog.text = text;
                    ig.game.spikeDialog.show();
                }
                
                ig.game.gameover = false;
                this.showScoreTime = null;
            }
            
            for (var i = 0; i < this.cells.length; i++)
                this.cells[i].update();
                
            this.idle += ig.system.tick;
            
            this.balloonBounceHelper.update();
            
            if (this.needsPopulated)
            {
                if (this.needsPopulatedFrameCount >= this.needsPopulatedFrameDelay)
                    this.populateGrid();
                else
                    this.needsPopulatedFrameCount++;
            }
        },
        
        draw: function()
        {
            if (this.anvilInUse)
            {
                var pos = this.getGridPixelPosition(this.anvilColumn, this.anvilRow);
                this.anvilAnim.draw(pos.x + 4, pos.y);
            }
        }
    });
});