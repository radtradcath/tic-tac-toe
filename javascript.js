let Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],

    clearBoard: function () {
        let render = DisplayController();
        Gameboard.gameboard = [null, null, null, null, null, null, null, null, null];
        render.renderGameboard();
    }
};

let playerFactory = function (name, mark) {
    return {
        name,
        mark,
    };
};

function GameController() {
    let player1 = playerFactory('player1', 'X');
    let player2 = playerFactory('player2', 'O');
    let turn = 0;
    let playerTurn;

    function chooseCell(cell, playerMark) {
        if (!Gameboard.gameboard[cell]) {
            Gameboard.gameboard[cell] = playerMark;
        }
    }

    function handleTurn() {
        if (turn % 2 == 0) {
            playerTurn = player1.mark;
            turn++;
            console.log(playerTurn);
            return playerTurn;

        } else {
            playerTurn = player2.mark;
            console.log(playerTurn);
            turn++
            return playerTurn;
        }
    }

    function checkWinner(marker) {
        if (((Gameboard.gameboard[0] === marker) && (Gameboard.gameboard[1] === marker) && (Gameboard.gameboard[2] === marker)) ||
            ((Gameboard.gameboard[3] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[5] === marker)) ||
            ((Gameboard.gameboard[6] === marker) && (Gameboard.gameboard[7] === marker) && (Gameboard.gameboard[8] === marker)) ||
            ((Gameboard.gameboard[0] === marker) && (Gameboard.gameboard[3] === marker) && (Gameboard.gameboard[6] === marker)) ||
            ((Gameboard.gameboard[1] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[7] === marker)) ||
            ((Gameboard.gameboard[2] === marker) && (Gameboard.gameboard[5] === marker) && (Gameboard.gameboard[8] === marker)) ||
            ((Gameboard.gameboard[0] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[8] === marker)) ||
            ((Gameboard.gameboard[2] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[6] === marker))) {
            
            return `${marker} wins the round!`;

        } else if (Gameboard.gameboard.indexOf(null) === -1) {
            console.log('That\' a tie');
            return 'That\' a tie';
        }
    }
    return {
        handleTurn,
        chooseCell,
        checkWinner,
    }
}


function DisplayController() {
    let cells = document.querySelectorAll('.cell');
    let newGame = GameController();

    function renderGameboard() {
        for (i = 0; i <= Gameboard.gameboard.length - 1; i++) {
            cells[i].textContent = Gameboard.gameboard[i];
        }
    }

    function handleGameEvent(e) {
        let playerTurn = newGame.handleTurn();

        if (e.target.textContent !== "") {
            return void (0);

        } else {
            newGame.chooseCell(e.target.id, playerTurn);
            renderGameboard();
            newGame.checkWinner(playerTurn);
        }
    }

    cells.forEach((c) => {
        c.addEventListener('click', handleGameEvent);
    });

    renderGameboard();

    return {
        renderGameboard,
    }
}

DisplayController();
