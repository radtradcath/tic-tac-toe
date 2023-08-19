let Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],

    clearBoard: function() {
        Gameboard.gameboard = [null, null, null, null, null, null, null, null, null]
    },
};

let playerFactory = function (name, mark) {
    return {
        name,
        mark,
    };
};

function GameController() {
    let turn = 0;
    let playerTurn;

    function chooseCell(cell, playerMark) {
        if (!Gameboard.gameboard[cell]) {
            Gameboard.gameboard[cell] = playerMark;
        }
    }

    function handleTurn(player1, player2) {
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

            return marker;

        } else if (Gameboard.gameboard.indexOf(null) === -1) {
            return 'That\' a tie';
        }
        else {
            return;
        }
    }
    return {
        handleTurn,
        chooseCell,
        checkWinner,
    }
}


function DisplayController() {
    let gameboardContainer = document.querySelector('.gameboard-container');
    let newGame = GameController();
    let btnGetName = document.querySelector('#getNames');
    let inputName1 = document.querySelector('#username1');
    let inputName2 = document.querySelector('#username2');
    let displayTurn = document.querySelector('.display-turn');
    let displayWinner = document.querySelector('.display-winner');
    let resetBtn = document.querySelector('.reset');
    let firstPlayer;
    let secondPlayer;

    function hideGrid() {
        while (gameboardContainer.firstChild) {
            gameboardContainer.removeChild(gameboardContainer.firstChild);
        }
    }

    function showGrid() {      
        let grid = document.createElement('div');
        grid.classList.add('gameboard');
        gameboardContainer.appendChild(grid);

        for (i = 0; i <= 8; i++) {
            let cell = document.createElement('div')
            cell.classList.add('cell');
            cell.setAttribute('id', i);
            grid.appendChild(cell);
        }

        let createdCells = document.querySelectorAll('.cell');
        createdCells.forEach((c) => {
            c.addEventListener('click', handleGameEvent);
        });
    }

    function handleNamesEvent(e) {
        let player1Name = inputName1.value;
        let player2Name = inputName2.value;
        showGrid();
        firstPlayer = playerFactory(player1Name, 'X');
        secondPlayer = playerFactory(player2Name, 'O');
        e.preventDefault();
        displayTurn.textContent = `${firstPlayer.name}'s turn`;
    }

    function updateDisplayTurn() {
        displayTurn.textContent == `${firstPlayer.name}'s turn` ? displayTurn.textContent = `${secondPlayer.name}'s turn` :
            displayTurn.textContent == `${secondPlayer.name}'s turn` ? displayTurn.textContent = `${firstPlayer.name}'s turn` : "";
    }

    function checkEndGame(winner) {
        if (newGame.checkWinner(winner) === 'X') {
            displayWinner.textContent = `${firstPlayer.name} is the winner!`
            displayTurn.textContent = "";
        } else if (newGame.checkWinner(winner) === 'O') {
            displayWinner.textContent = `${secondPlayer.name} is the winner!`
            displayTurn.textContent = "";
        }
    }


    function renderGameboard() {
        for (i = 0; i <= Gameboard.gameboard.length - 1; i++) {
            let cells = document.querySelectorAll('.cell');
            cells[i].textContent = Gameboard.gameboard[i];
        }
    }

    function handleGameEvent(e) {
        console.log('alo');
        if (e.target.textContent !== "" || !firstPlayer || !secondPlayer || firstPlayer.name === undefined || secondPlayer.name === undefined) {
            return void (0);

        } else {
            let playerTurn = newGame.handleTurn(firstPlayer, secondPlayer);
            newGame.chooseCell(e.target.id, playerTurn);
            renderGameboard();
            updateDisplayTurn();
            checkEndGame(playerTurn);
        }
    }

    function resetGame() {
        displayTurn.textContent = "";
        displayWinner.textContent = "";
        inputName1.value = "";
        inputName2.value = "";
        Gameboard.clearBoard();
        firstPlayer.name = undefined;
        secondPlayer.name = undefined;
        hideGrid();
    }

    btnGetName.addEventListener('click', handleNamesEvent);

    resetBtn.addEventListener('click', resetGame);

    return {
        renderGameboard,
        showGrid,
        hideGrid
    }
}

DisplayController();