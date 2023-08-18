let cells = document.querySelectorAll('.cell');

let Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],
    turn: 0,
}

let playerFactory = function (name, mark) {
    return {
        name,
        mark,
    };
};

let player1 = playerFactory('player1', 'X');
let player2 = playerFactory('player2', 'O');


let renderGameboard = function () {
    for (i = 0; i <= Gameboard.gameboard.length - 1; i++) {
        cells[i].textContent = Gameboard.gameboard[i];
    }
}

let chooseCell = function (player, cell) {
    if (!Gameboard.gameboard[cell]) {
        return Gameboard.gameboard[cell] = player.mark;
    }
}

let playerMark = function (e) {
    if (e.target.textContent !== "") {
        return void (0);
    }
    else if (Gameboard.turn % 2 == 0) {
        chooseCell(player1, e.target.id);
        Gameboard.turn++;
        renderGameboard();
        checkWinner('X');
    } else {
        chooseCell(player2, e.target.id);
        Gameboard.turn++
        renderGameboard();
        checkWinner('O');
    }
}

cells.forEach((c) => {
    c.addEventListener('click', playerMark);
});

let checkWinner = function (marker) {
    if (((Gameboard.gameboard[0] === marker) && (Gameboard.gameboard[1] === marker) && (Gameboard.gameboard[2] === marker)) ||
        ((Gameboard.gameboard[3] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[5] === marker)) ||
        ((Gameboard.gameboard[6] === marker) && (Gameboard.gameboard[7] === marker) && (Gameboard.gameboard[8] === marker)) ||
        ((Gameboard.gameboard[0] === marker) && (Gameboard.gameboard[3] === marker) && (Gameboard.gameboard[6] === marker)) ||
        ((Gameboard.gameboard[1] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[7] === marker)) ||
        ((Gameboard.gameboard[2] === marker) && (Gameboard.gameboard[5] === marker) && (Gameboard.gameboard[8] === marker)) ||
        ((Gameboard.gameboard[0] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[8] === marker)) ||
        ((Gameboard.gameboard[2] === marker) && (Gameboard.gameboard[4] === marker) && (Gameboard.gameboard[6] === marker))) {

        console.log('you win')

    } else if (Gameboard.gameboard.indexOf(null) === -1) {
        console.log("That's a tie");
    }
}
