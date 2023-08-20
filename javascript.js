let Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],

    clearBoard: function () {
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
    let gameFinished = false;    

    function chooseCell(cell, playerMark) {
        if (!Gameboard.gameboard[cell]) {
            Gameboard.gameboard[cell] = playerMark;
        }
    }

    function handleTurn(player1, player2) {
        if (turn % 2 == 0) {
            playerTurn = player1.mark;
            turn++;            
            return playerTurn;

        } else {
            playerTurn = player2.mark;            
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
            this.gameFinished = true;
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
        gameFinished,
    }
}


function DisplayController() {
    let gameboardContainer = document.querySelector('.gameboard-container');
    let newGame = GameController();
    console.log(newGame);
    let inputContainer = document.querySelector('.input-container');
    let displayTurn = document.querySelector('.display-turn');
    let displayWinner = document.querySelector('.display-winner');
    let resetBtn = document.querySelector('.reset');
    let firstPlayer;
    let secondPlayer;

    function hideForm() {
        while (inputContainer.firstChild) {
            inputContainer.removeChild(inputContainer.firstChild);
        }
    }

    function showForm() {
        let form = document.createElement('form');
        let user1label = document.createElement('label');
        let username1 = document.createElement('input');
        let user2label = document.createElement('label');
        let username2 = document.createElement('input');
        let getNamesBtn = document.createElement('button');

        user1label.setAttribute('for', 'username1');
        user1label.textContent = "Enter Player 1 name:";
        username1.setAttribute('type', 'text');
        username1.setAttribute('id', 'username1');
        username1.setAttribute('name', 'username1');

        user2label.setAttribute('for', 'username2');
        user2label.textContent = "Enter Player 2 name:";
        username2.setAttribute('type', 'text');
        username2.setAttribute('id', 'username2');
        username2.setAttribute('name', 'username2');

        getNamesBtn.setAttribute('type', 'submit');
        getNamesBtn.setAttribute('id', 'getNames');
        getNamesBtn.textContent = 'JOGAR';

        inputContainer.appendChild(form);
        form.appendChild(user1label);
        form.appendChild(username1);
        form.appendChild(user2label);
        form.appendChild(username2);
        form.appendChild(getNamesBtn);

        getNamesBtn.addEventListener('click', handleNamesEvent);
    }

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
        let player1Name = username1.value;
        let player2Name = username2.value;
        e.preventDefault();
        hideForm();
        showGrid();
        firstPlayer = playerFactory(player1Name, 'X');
        secondPlayer = playerFactory(player2Name, 'O');
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
            console.log(newGame);

        } else if (newGame.checkWinner(winner) === 'O') {
            displayWinner.textContent = `${secondPlayer.name} is the winner!`
            displayTurn.textContent = "";
            console.log(newGame);
        }
    }


    function renderGameboard() {
        for (i = 0; i <= Gameboard.gameboard.length - 1; i++) {
            let cells = document.querySelectorAll('.cell');
            cells[i].textContent = Gameboard.gameboard[i];
        }
    }

    function handleGameEvent(e) {        
        if (e.target.textContent !== "" || !firstPlayer || !secondPlayer || firstPlayer.name === undefined || secondPlayer.name === undefined || newGame.gameFinished === true) {
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
        if (!gameboardContainer.firstChild) {
            return void (0);
        }
        displayTurn.textContent = "";
        displayWinner.textContent = "";
        Gameboard.clearBoard();
        firstPlayer.name = undefined;
        secondPlayer.name = undefined;
        newGame.gameFinished = false;
        GameController();
        hideGrid();
        showForm();
    }

    resetBtn.addEventListener('click', resetGame);
    showForm();

    return {
        renderGameboard,
        showGrid,
        hideGrid,
        showForm,
        hideForm,
    }
}

DisplayController();