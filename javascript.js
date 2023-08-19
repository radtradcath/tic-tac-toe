let Gameboard = (() => {
    let gameboard = [null, null, null, null, null, null, null, null, null];
    let turn = 0;
    return {
        gameboard,
        turn
    }
})();


let playerFactory = function (name, mark) {
   let chooseCell = function(cell) {
     if (!Gameboard.gameboard[cell]) {
        return Gameboard.gameboard[cell] = this.mark;
    }
}
    return {
        chooseCell,
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

let playGame = function (e) {
    if (e.target.textContent !== "") {
        return void (0);
    }
    else if (Gameboard.turn % 2 == 0) {
        player1.chooseCell(e.target.id);
        Gameboard.turn++;
        renderGameboard();
        checkWinner('X');
    } else {
        player2.chooseCell(e.target.id);
        Gameboard.turn++
        renderGameboard();
        checkWinner('O');
    }
}

let cells = document.querySelectorAll('.cell');
cells.forEach((c) => {
        c.addEventListener('click', playGame);
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
