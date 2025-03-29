function Board() {

    //Public:
    let board = Array.apply(null, Array(9)).map((item) => Cell());  //creates board of size 9 and maps Cell() to every item



    //Public:
    const getBoard = () => board;

    const mark = (player, loc) => {
        if (board[loc].getState() === '_') {
            board[loc].setState(player);
        }

    };

    function checkWinner(players) {
        if (hasWon(players[0])) {
            console.log(`${players[0]} wins!`);
        }
        else if (players[1]) {
            console.log(`${players[1]} wins!`);
        }
        else {
            console.log("NO winners!")
        }
    }


    const printBoard = () => {
        console.log(
            board
                .map(cell => cell.getState())
                .reduce((acc, state, idx) => acc + state + ((idx + 1) % 3 === 0 ? '\n' : ' | '), '')
        );

    }

    //Private
    function hasWon(player) {
        let magicSq = [4, 9, 2, 3, 5, 7, 8, 1, 6];
        let len = board.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                for (let k = 0; k < len; k++) {
                    if (i != j && i != k && j != k) {
                        if (board[i].getState() === player && board[j].getState() === player && board[k].getState() === player) {
                            if (magicSq[i] + magicSq[j] + magicSq[k] === 15) {
                                console.log(magicSq[i], magicSq[j], magicSq[k])
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    return { getBoard, mark, printBoard, checkWinner };

}


function Cell() {

    //Private
    let state = '_';

    //Public:
    const setState = (player) => {
        state = player;
    }

    const getState = () => state;

    return { setState, getState };
};


function GameController() {

    const board = Board();
    let players = ['X', 'O'];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (loc) => {
        console.log(
            `Dropping ${getActivePlayer()}'s token into cell ${loc}...`
        );

        board.mark(activePlayer, loc)
        console.log(board.printBoard())
        board.checkWinner(players)
        switchPlayerTurn()
    }



    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };


}

function ScreenController() {

    const game = GameController()
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {

        // clear the board
        boardDiv.textContent = "";

        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer}'s turn...`

        board.forEach((cell, index) => {

            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.column = index;
            cellButton.textContent = cell.getState()
            boardDiv.appendChild(cellButton);

        });


    };

    function clickHandlerBoard(e) {

        const selectedCell = e.target.dataset.column;
        // Make sure I've clicked a column and not the gaps in between
        if (!selectedCell) return;

        game.playRound(selectedCell);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen()
}

ScreenController()