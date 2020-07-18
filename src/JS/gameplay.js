const startBtn = document.querySelector('.body__btn_start');
const hintHideBtn = document.querySelector('.body__btn_hint-hide');
const hintShowBtn = document.querySelector('.body__btn_hint-show');
const restartBtn = document.querySelector('.body__btn_restart');

const hints = document.querySelectorAll('.tile__hint');
const tiles = document.querySelectorAll('.tile');


//array with colors. You can also use rgb or hex
const tileColors = [
    'orange',
    'yellow',
    'red',
    'blue',
    'green',
    'darkblue',
    'lightgreen',
    'pink'
];

//Global variables
//writes the DOM element of the tile to these variables
let selectedTile1;
let selectedTile2;
//the color of the bottom side of the tile is written here
let selectedTileColor1;
let selectedTileColor2;

//Until the Start button is pressed, tiles cannot be flipped
let gameStarted = false;


//Doubles the array once
function doubleArr(arr) {
    arr.map(el => arr.push(el))
}
doubleArr(tileColors);
//Shuffles the colors in an array in a random order
function shuffleArr(arr) {
    arr.sort(() => Math.random() - 0.5);
}

//Assigns a color to the hint and back of the tilegit reset --hard HEAD hash
function bindColorToTile(colors) {
    tiles.forEach((tile, i) => {
        tile.childNodes.forEach((node) => {
                if (node.classList == 'tile__top') {
                    node.childNodes.forEach((node) => {
                        if (node.classList == 'tile__hint') {
                            node.style.backgroundColor = colors[i]
                        }
                    })
                }
            })
        tile.childNodes.forEach((node) => {
            if (node.classList == 'tile__bottom') {
                node.style.backgroundColor = colors[i]
            }
        })
    })
}


function hideButtons(...btnToHide) {
    btnToHide.forEach((btn) => {
        btn.classList.remove('body__btn_show')
    });
};
function showButtons(...btnToShow) {
    btnToShow.forEach((btn) => {
        btn.classList.add('body__btn_show')
    });
};

function hideHints() {
    hints.forEach((hint) => {
        hint.classList.remove('tile__hint_active')
    })
}
function showHints() {
    hints.forEach((hint) => {
        hint.classList.add('tile__hint_active')
    })
}

function flipTiles() {
    tiles.forEach((tile) => {
        tile.classList.remove('tile_selected')
    })
}
function restoreTiles() {
    tiles.forEach((tile) => {
        tile.classList.remove('tile_disappear')
    })
}

function cleanGlobalVar() {
    selectedTile1 = undefined;
    selectedTile2 = undefined;
    selectedTileColor1 = undefined;
    selectedTileColor1 = undefined;
}

//Coincidence check function. If the tiles are matched, the function hides them. If they differ, it turns over. Cleans up global variables
function complianceCheck() {
    if (selectedTileColor2 == selectedTileColor1) {
        selectedTile1.classList.add('tile_disappear')
        selectedTile2.classList.add('tile_disappear')
        cleanGlobalVar()
    } else {
        selectedTile2.classList.remove('tile_selected')
        selectedTile1.classList.remove('tile_selected')
        cleanGlobalVar()
    }

}

//Buttons. Delete themselves when pressed
//When you press the start button, the game starts. Tiles can be flipped. Shuffles the array so that the player cannot repeat the result of the previous game. Rebinds colors from a shuffled array
startBtn.addEventListener('click', (event)=> {
        gameStarted = true;
        restoreTiles()
        hideButtons(event.target);
        showButtons(restartBtn, hintShowBtn);
        shuffleArr(tileColors);
        bindColorToTile(tileColors);
});
hintShowBtn.addEventListener('click', (event)=> {
        showHints()
        hideButtons(event.target);
        showButtons(hintHideBtn);
});
hintHideBtn.addEventListener('click', (event)=> {
        hideHints();
        hideButtons(event.target);
        showButtons(hintShowBtn);
});
//Button if the player wants to end the game. Flips open tiles, clears variables and blocks the possibility of starting a new game before pressing the start button
restartBtn.addEventListener('click', (event)=> {
        gameStarted = false;
        hideHints();
        flipTiles();
        cleanGlobalVar();
        hideButtons(event.target, hintShowBtn, hintHideBtn);
        showButtons(startBtn);
        shuffleArr(tileColors);
});



tiles.forEach((tile) => {
    tile.addEventListener('click' ,(event)=> {
        //if the player pressed the start button. Until then, tiles cannot be flipped
            if (gameStarted) {
                //if you click on an already open tile, it will close
                if (selectedTile1 == event.currentTarget) {
                    event.currentTarget.classList.add('tile_selected')
                    selectedTile1 = undefined
                    event.currentTarget.childNodes.forEach((node) => {
                        if (node.classList == 'tile__bottom') {
                            selectedTileColor1 = undefined;
                        };
                    });
                } else if (selectedTile2 == event.currentTarget) {
                    event.currentTarget.classList.add('tile_selected');
                    selectedTile2 = undefined;
                    event.currentTarget.childNodes.forEach((node) => {
                        if (node.classList == 'tile__bottom') {
                            selectedTileColor2 = undefined;
                        };
                    });
                    //if the first tile is not yet open, it will open it by clicking
                } else if (selectedTile1 == undefined) {
                    event.currentTarget.classList.toggle('tile_selected');
                    selectedTile1 = event.currentTarget;
                    event.currentTarget.childNodes.forEach((node) => {
                        if (node.classList == 'tile__bottom') {
                            selectedTileColor1 = node.style.backgroundColor;
                        };
                    });
                    //if the second tile is not the same element that you clicked the first time, pass the current tile and the color of its bottom side to global variables
                } else if (selectedTile2 == undefined && selectedTile1 != event.currentTarget) {
                    event.currentTarget.classList.toggle('tile_selected');
                    selectedTile2 = event.currentTarget;
                    event.currentTarget.childNodes.forEach((node) => {
                        if (node.classList == 'tile__bottom') {
                            selectedTileColor2 = node.style.backgroundColor;
                        };
                    });
                    //a second delay to show the color of both tiles. After the delay, the tiles disappear if the colors match or flip if the colors are different
                    setTimeout(complianceCheck,1000);
                };
            };
    });
});




