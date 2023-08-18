let cells = document.querySelectorAll('.cell');

let Gameboard = {
    gameboard: [],
    turn: 0,
}

let playerFactory = function(name, mark) {
    return {
        name,
        mark,
    };
};

let player1 = playerFactory('player1', 'X');
let player2 = playerFactory('player2', 'O');


let renderGameboard = function() {
        for (i = 0; i <= Gameboard.gameboard.length - 1; i++) {
           cells[i].textContent = Gameboard.gameboard[i];
        }
    }

let chooseCell = function(player, cell) {
    if (!Gameboard.gameboard[cell]) {  
    return Gameboard.gameboard[cell] = player.mark;
    }
}

let playerMark = function(e) {
    if (e.target.textContent !== "") {
        return void(0);
    }
     else if (Gameboard.turn % 2 == 0) {
        chooseCell(player1, e.target.id);
        Gameboard.turn++;
        renderGameboard();        
    } else {
        chooseCell(player2, e.target.id);        
        Gameboard.turn++
        renderGameboard();
    }
}

cells.forEach((c) => {    
    c.addEventListener('click', playerMark);
});