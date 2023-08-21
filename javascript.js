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
    let playerMark;
    let gameFinished = false;

    function chooseCell(cell, playerMark) {
        console.log(cell);
        if (!Gameboard.gameboard[cell]) {
            Gameboard.gameboard[cell] = playerMark;
        }
    }

    function aiChooseCell() {
        let randomCell;

        while (Gameboard.gameboard[randomCell] !== null) {
            randomCell = Math.floor(Math.random() * 9);
        };
        return randomCell;
    }


    function handleTurn(player1, player2) {
        if (this.turn % 2 == 0) {
            this.playerMark = player1.mark;
            this.turn++;
            return this.playerMark;

        } else {
            this.playerMark = player2.mark;
            this.turn++
            return this.playerMark;
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
            this.gameFinished = true;
            return 'That\'s a tie';
        }
        else {
            return;
        }
    }
    return {
        aiChooseCell,
        handleTurn,
        chooseCell,
        checkWinner,
        gameFinished,
        turn,
        playerMark,
    }
}


function DisplayController() {
    let gameboardContainer = document.querySelector('.gameboard-container');
    let newGame = GameController();
    let inputContainer = document.querySelector('.input-container');
    let displayTurn = document.querySelector('.display-turn');
    let displayWinner = document.querySelector('.display-winner');
    let resetBtn = document.querySelector('.reset');
    let aiBtn = document.querySelector('#aiBtn');
    let firstPlayer;
    let secondPlayer;
    let aiPlayer = false;

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
        user1label.setAttribute('id', 'user1label');
        user1label.textContent = "Enter Player 1 name:";
        username1.setAttribute('type', 'text');
        username1.setAttribute('id', 'username1');
        username1.setAttribute('name', 'username1');
        username1.setAttribute('required', "");

        user2label.setAttribute('for', 'username2');
        user2label.setAttribute('id', 'user2label');
        user2label.textContent = "Enter Player 2 name:";
        username2.setAttribute('type', 'text');
        username2.setAttribute('id', 'username2');
        username2.setAttribute('name', 'username2');
        username2.setAttribute('required', "");

        getNamesBtn.setAttribute('type', 'submit');
        getNamesBtn.setAttribute('id', 'getNames');
        getNamesBtn.textContent = 'PLAY';

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
    aiBtn.addEventListener('click', handleAiEvent);

    function handleAiEvent() {
        let form = document.querySelector('form');        
        let userName2 = document.querySelector('#username2');
        let user2label = document.querySelector('#user2label');
        aiPlayer = true;
        form.removeChild(userName2);
        form.removeChild(user2label);
        aiBtn.textContent = 'Play against other player.';

        aiBtn.removeEventListener('click', handleAiEvent);
        aiBtn.addEventListener('click', changeToTwoPlayers);
    }

    function changeToTwoPlayers() {
        let form = document.querySelector('form');
        let user2label = document.createElement('label');
        let username2 = document.createElement('input');

        aiPlayer = false;
        user2label.setAttribute('for', 'username2');
        user2label.setAttribute('id', 'user2label');
        user2label.textContent = "Enter Player 2 name:";
        username2.setAttribute('type', 'text');
        username2.setAttribute('id', 'username2');
        username2.setAttribute('name', 'username2');
        username2.setAttribute('required', "");
        form.appendChild(user2label);
        form.appendChild(username2);

        aiBtn.textContent = "Play Against Ai";
        aiBtn.removeEventListener('click', changeToTwoPlayers);
        aiBtn.addEventListener('click', handleAiEvent);
    }

    function handleNamesEvent(e) {
        let form = document.querySelector('form');
        let isFormValid = form.checkValidity();
        let player1Name;
        let player2Name;
        if (!isFormValid) {
            form.reportValidity();
        } else if (!aiPlayer) {
            player1Name = username1.value;
            player2Name = username2.value;
            e.preventDefault();
            hideForm();
            showGrid();
            firstPlayer = playerFactory(player1Name, 'X');
            secondPlayer = playerFactory(player2Name, 'O');
            displayTurn.textContent = `${firstPlayer.name}'s turn`;
        } else if (aiPlayer) {
            player1Name = username1.value;
            player2Name = 'Computer';
            e.preventDefault();
            hideForm();
            showGrid();
            firstPlayer = playerFactory(player1Name, 'X');
            secondPlayer = playerFactory('Computer', 'O');
            displayTurn.textContent = `${firstPlayer.name}'s turn`;
        }
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

        } else if (newGame.checkWinner(winner) === 'That\'s a tie') {
            displayWinner.textContent = 'That\'s a tie';
            displayTurn.textContent = ""
        }
    }


    function renderGameboard() {
        for (i = 0; i <= Gameboard.gameboard.length - 1; i++) {
            let cells = document.querySelectorAll('.cell');
            cells[i].textContent = Gameboard.gameboard[i];
        }
    }

    function handleGameEvent(e) {
        console.log('clicked');
        console.log(firstPlayer);
        console.log(secondPlayer);
        console.log(firstPlayer.name);
        console.log(secondPlayer.name);
        console.log(newGame.gameFinished);
        console.log(aiPlayer);
        if (e.target.textContent !== "" || !firstPlayer || !secondPlayer || firstPlayer.name === undefined || secondPlayer.name === undefined || newGame.gameFinished === true) {
            return void (0);
        } else {
            if (aiPlayer === true) {
                newGame.chooseCell(e.target.id, newGame.handleTurn(firstPlayer, secondPlayer));
                checkEndGame(newGame.playerMark);
                if (Gameboard.gameboard.includes(null)) {
                    newGame.chooseCell(newGame.aiChooseCell(), newGame.handleTurn(firstPlayer, secondPlayer));
                }
                checkEndGame(newGame.playerMark);
                renderGameboard();
                updateDisplayTurn();
            } else if (aiPlayer === false) {
                
                newGame.chooseCell(e.target.id, newGame.handleTurn(firstPlayer, secondPlayer));
                checkEndGame(newGame.playerMark);
                renderGameboard();
                updateDisplayTurn();
            }

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

let handleDOM = DisplayController();