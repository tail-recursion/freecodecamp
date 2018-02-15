

var myTurn = true;
var myToken = 'X';
var usedSquares = [false,false,false,false,false,false,false,false,false]; // which grid squares have been used
var computerTurnTimeout;

// Set square height equal to square width
// https://stackoverflow.com/a/37956693
var squares = document.querySelectorAll(".col-xs-4");
for (var i=0; i < squares.length; i++) {
    var square = squares[i];
    square.style.height = getComputedStyle(square).width;
}

getToken();

function getToken() {
    // Prompt user for token
    while (true) {
        var input = prompt("Do you want to be X or O?");
        if (input == 'X' || input == 'x') { myToken = 'X'; break; }
        else if (input == 'O' || input == 'o') { myToken = 'O'; break; }
    }
}

function reset() {
    // Set all squares as unused
    for (var i=0; i<usedSquares.length; i++) usedSquares[i] = false;
    // Human's turn first
    myTurn = true;
    // Prompt user for token
    getToken();
    // Loop through all squares and remove token info
    var squares = document.querySelectorAll(".col-xs-4");
    for (var i=0; i < squares.length; i++) {
        var square = squares[i];
        square.innerHTML = ''; // reset HTML
        square.value = undefined; // reset value
    }
}

function checkGameOver() {
    // check if three X or O tokens have been placed in a row, column or diagonal

    var solutions = [[0,1,2],[3,5,8],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // all possible combinations of indices that create a row, column or diagonal of three adjacent squares

    // loop through each token
    var tokens=['X','O'];
    tokens.forEach(function(token) {
        // loop through all combinations of 3 adjacent squares
        solutions.forEach(function(solution) {
            var first = document.getElementById(solution[0]);
            var second = document.getElementById(solution[1]);
            var third = document.getElementById(solution[2]);
            // check if all adjacent squares have same token
            if (first.value === token && second.value === token && third.value === token) {
                var out = (first.value===myToken)?"You won!":"Computer wins!";
                clearTimeout(computerTurnTimeout);
                alert('Game over! ' + out);
                reset();
                return true;
            }
        });
    });

    // check all squares are used
    if (usedSquares.every(x=>x)) {
        // game over
        clearTimeout(computerTurnTimeout);
        alert("Game Over! It's a draw!");
        reset();
        return true;
    }

    return false;
}

function computerTurn() {
    /*
        TODO: implement minimax
        Minimax can build the whole search tree (solve the game)
        currently just picking a completely random unused square
     */

    computerTurnTimeout = setTimeout(function() {
        var unusedIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(i => !usedSquares[i]);
        var randomUnusedID = unusedIDs[Math.floor(Math.random() * unusedIDs.length)];
        var computerToken = (myToken === 'X') ? 'O' : 'X';
        var square = document.getElementsByClassName('col-xs-4')[randomUnusedID];
        square.innerHTML = '<div class="token">' + computerToken + '</div>';
        square.value = computerToken;
        usedSquares[randomUnusedID] = true;
        myTurn = true;
        checkGameOver();
    }, 1000);

}



function clicked(square) {
    var used = usedSquares[square.id];
    if (!used) {
        if (myTurn) {

            square.innerHTML = '<div class="token">'+myToken+'</div>';
            square.value = myToken;

            usedSquares[square.id] = true;

            myTurn = false;
            var gameover = checkGameOver();
            if (!gameover)
                computerTurn();
            //myToken = (myToken=='X')?'O':'X';
        }
    }
}



