document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;
        checkWin();
        checkDraw();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.innerText = `${gameState[a]} wins!`;
                gameActive = false;
                return;
            }
        }
    }

    function checkDraw() {
        if (!gameState.includes('') && gameActive) {
            status.innerText = "It's a draw!";
            gameActive = false;
        }
    }

    function handleCellHover(cell) {
        if (cell.innerText === '' && gameActive) {
            cell.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    }

    function handleCellLeave(cell) {
        cell.style.backgroundColor = '';
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.innerText = '';
        board.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    }

    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => {
                if (cell.innerText === '' && gameActive) {
                    handleCellClick(cell, i);
                }
            });
            cell.addEventListener('mouseenter', () => handleCellHover(cell));
            cell.addEventListener('mouseleave', () => handleCellLeave(cell));
            board.appendChild(cell);
        }
    }

    resetButton.addEventListener('click', resetGame);

    initializeBoard();
});
