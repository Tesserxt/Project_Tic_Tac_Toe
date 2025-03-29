function Board() {

    //Public:
    let board = Array.apply(null, Array(9)).map((item) => Cell());  //creates board of size 9 and maps Cell() to every item



    //Public:
    const mark = (player, loc) => {
        board[loc].setState(player);
    };

    function checkWinner() {
        if (hasWon('x')) {
            console.log("x win!");
        }
        else if (hasWon('o')) {
            console.log("o win!")
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

    return { mark, printBoard, checkWinner };

}


function Cell() {

    //Private
    let state = 0;

    //Public:
    const setState = (player) => {
        state = player;
    }

    const getState = () => state;

    return { setState, getState };
};