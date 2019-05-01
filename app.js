const CROSS = `<svg version="1.1" class="cross-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve">
<g>
<path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
</g>
</svg>`;
const CIRCLE = `<svg version="1.1" class="cross-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="438.533px" height="438.533px" viewBox="0 0 438.533 438.533" style="enable-background:new 0 0 438.533 438.533;"
xml:space="preserve">
<g>
<path d="M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0
   c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267
   c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407
   s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062
   C438.533,179.485,428.732,142.795,409.133,109.203z M353.742,297.208c-13.894,23.791-32.736,42.633-56.527,56.534
   c-23.791,13.894-49.771,20.834-77.945,20.834c-28.167,0-54.149-6.94-77.943-20.834c-23.791-13.901-42.633-32.743-56.527-56.534
   c-13.897-23.791-20.843-49.772-20.843-77.941c0-28.171,6.949-54.152,20.843-77.943c13.891-23.791,32.738-42.637,56.527-56.53
   c23.791-13.895,49.772-20.84,77.943-20.84c28.173,0,54.154,6.945,77.945,20.84c23.791,13.894,42.634,32.739,56.527,56.53
   c13.895,23.791,20.838,49.772,20.838,77.943C374.58,247.436,367.637,273.417,353.742,297.208z"/>
</g>
</svg>`;

let DATA = {
   mainBoard: [0, 1, 2, 3, 4, 5, 6, 7, 8],
   localBoards: {
      0: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      1: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      4: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      5: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      6: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      7: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      8: [0, 1, 2, 3, 4, 5, 6, 7, 8],
   },
   winComb: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
   ],
   openBoards: [0, 1, 2, 3, 4, 5, 6, 7, 8],
   difficultyMode: "normal",
   humanSVG: CROSS,
   aiSVG: CIRCLE,
   human: "X",
   ai: "O",
};


//=====================================VIEW================================
let VIEW = {

   //PLACES THE CORRESPONDING SVG MARK IN THE TARGETED CELL
   placeMark(target, player) {
      let mark = player === DATA.human ? DATA.humanSVG : DATA.aiSVG;
      document.getElementById(target).innerHTML = mark;
   },

   // DISPLAYS THE END GAME MESSAGE
   displayEndGame(message) {
      let result = document.querySelector(".endgame");
      let resultMessage = document.querySelector(".endgame-message");
      result.classList.add("endgame-active");
      resultMessage.innerHTML = message;
   },

   //RESETS THE VIEW FOR A NEW GAME
   resetView() {
      let result = document.querySelector(".endgame");
      result.classList.remove("endgame-active");
      let cells = document.querySelectorAll(".cross-circle");
      let grids = document.querySelectorAll(".result");
      for (let i = 0; i < cells.length; i++) {
         cells[i].remove();
      }
      for (let i = 0; i < grids.length; i++) {
         grids[i].classList.remove(`local-win`);
      }
   },

   displayDifficulty() {
      let difficulty = document.getElementById("difficulty-display");
      difficulty.innerHTML = `PLAYING ON: ${DATA.difficultyMode} MODE`
   },

   weaponDisplay() {
      let cross = document.getElementById("cross-icon");
      let circle = document.getElementById("circle-icon");
      if (DATA.human === "X") {
         cross.classList.add("icon-active");
         circle.classList.remove("icon-active");
      } else {
         cross.classList.remove("icon-active");
         circle.classList.add("icon-active");
      }
   },

   highlightGame() {
      for (let i = 0; i < DATA.mainBoard.length; i++) {
         document.getElementById(`local-${i}`).classList.remove(`highlight`);
      }

      if (DATA.openBoards.length === 1) {
         document.getElementById(`local-${DATA.openBoards[0]}`).classList.add(`highlight`);
      } else {
         for (let i = 0; i < DATA.openBoards.length; i++) {
            document.getElementById(`local-${DATA.openBoards[i]}`).classList.add(`highlight`);
         }
      }
   },
   removeHighlight() {
      for (let i = 0; i < DATA.mainBoard.length; i++) {
         document.getElementById(`local-${i}`).classList.remove(`highlight`);
      }
   },
   localWin(player, index) {
      let el = document.getElementById(`result-${index}`);
      el.classList.add(`local-win`);
      el.innerHTML = player === DATA.human ? DATA.humanSVG : player === DATA.ai ? DATA.aiSVG : `TIE`;
   }
};


const MODIFIER = {

   //================PLAY GAME METHODS==================
   //===================================================

   //RUNS A TURN BOTH FOR HUMAN AND AI
   turn(event) {

      let cell = Number(event.target.id[6]);
      let localGame = Number(event.target.id[4]);

      if (DATA.openBoards.indexOf(localGame) === -1) return;
      if (typeof DATA.localBoards[localGame][cell] !== `number`) return;

      this.playerMove(cell, localGame, DATA.human);

      let win = this.checkWin(DATA.mainBoard, DATA.human);
      let tie = this.checkTie(DATA.mainBoard);
      if (win) {
         this.gameOver(win);
         return;
      }
      if (tie) {
         this.gameOver(tie);
         return;
      }
      setTimeout(() => {
         let mainBoardMove = DATA.openBoards.length === 1 ? DATA.openBoards[0] : DATA.openBoards[Math.floor(Math.random() * (DATA.openBoards.length - 1))];
         this.playerMove(this.aiMove(mainBoardMove), mainBoardMove, DATA.ai);

         let win = this.checkWin(DATA.mainBoard, DATA.human);
         let tie = this.checkTie(DATA.mainBoard);
         if (win) {
            this.gameOver(win);
            return;
         }
         if (tie) {
            this.gameOver(tie);
            return;
         }
      }, 100);
   },

   //PLACES A MOVE BOTH IN THE BOARD AND IN THE DOM AND CHECKS FOR A WIN
   playerMove(localCell, localBoard, player) {
      DATA.localBoards[localBoard][localCell] = player;
      VIEW.placeMark(`box-${localBoard}-${localCell}`, player);

      if (typeof DATA.mainBoard[localCell] !== `number`) {
         DATA.openBoards = DATA.mainBoard.filter(x => typeof x === `number`);
         VIEW.highlightGame();
      } else {
         DATA.openBoards = [localCell];
         VIEW.highlightGame();
      }

      let winner = this.checkWin(DATA.localBoards[localBoard], player);
      let tie = this.checkTie(DATA.localBoards[localBoard]);
      if (winner) this.localWin(winner, localBoard);
      if (tie) this.localWin(tie, localBoard)
   },

   //SETS THE LOCAL BOARD WITH ITS WINNER
   localWin(winner, localBoard) {
      DATA.mainBoard[localBoard] = winner.player;
      DATA.openBoards = DATA.mainBoard.filter(x => typeof x === `number`);
      VIEW.highlightGame();
      VIEW.localWin(winner.player, localBoard);
   },


   //SELECTS A MOVE FOR THE AI DEPENDING ON THE DIFFICULTY SET
   aiMove(mainBoardIndex) {
      if (DATA.difficultyMode === "hard") {
         return this.smartMove(mainBoardIndex, DATA.ai).index;
      } else if (DATA.difficultyMode === "easy") {
         return this.easyMove(mainBoardIndex);
      } else {
         let toss = Math.random() * 2;
         if (toss > 1.2) {
            return this.easyMove(mainBoardIndex);
         } else {
            return this.smartMove(mainBoardIndex, DATA.ai).index;
         }
      }

   },


   //CHOOSES A RANDOM EMPTY CELL FOR THE MOVE
   easyMove(mainBoardIndex) {
      let emptyCells = this.emptyCells(DATA.localBoards[mainBoardIndex]);
      let random = Math.floor(Math.random() * (emptyCells.length - 1));
      return emptyCells[random];
      // return emptyCells.length <= 0 ? null : emptyCells[random];
   },


   //MINMAX METHOD RESOLVES THE BEST SPOT FOR THE AI TO MOVE AND WIN
   smartMove(mainBoardIndex, player) {

      let board = DATA.localBoards[mainBoardIndex];
      let emptyCells = this.emptyCells(board);
      //checks for a winner or a tie during recursion and adds a score depending on the winner
      if (this.checkWin(board, DATA.human)) {
         return {
            score: -10
         };
      } else if (this.checkWin(board, DATA.ai)) {
         return {
            score: 10
         };
      } else if (emptyCells.length === 0) {
         return {
            score: 0
         };
      }
      //creates an array of moves and loops over the empty cells and calls itself for all possible moves
      let possibleMoves = [];
      for (let i = 0; i < emptyCells.length; i++) {
         let move = {};
         move.index = board[emptyCells[i]];
         board[emptyCells[i]] = player;

         if (player === DATA.ai) {
            let result = this.smartMove(mainBoardIndex, DATA.human);
            move.score = result.score;
         } else {
            let result = this.smartMove(mainBoardIndex, DATA.ai);
            move.score = result.score;
         }
         //sets the local image of the board to the move so the next recursion will play the following move
         board[emptyCells[i]] = move.index;

         possibleMoves.push(move);
      }
      //loops through the moves scores and find the best one for the ai
      let bestMove;
      if (player === DATA.ai) {
         let bestScore = -10000;
         for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i].score > bestScore) {
               bestScore = possibleMoves[i].score;
               bestMove = i;
            }
         }
      } else {
         let bestScore = 10000;
         for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i].score < bestScore) {
               bestScore = possibleMoves[i].score;
               bestMove = i;
            }
         }
      }

      return possibleMoves[bestMove];
   },

   //================UTILITY METHODS===================
   //==================================================

   //RESETS BOARD AND CALLS THE RESETVIEW METHOD
   resetGame() {
      DATA.mainBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      DATA.localBoards = {
         0: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         1: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         4: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         5: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         6: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         7: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         8: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      };
      DATA.openBoards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      VIEW.resetView();
      VIEW.removeHighlight();
      document.getElementById("main-game").addEventListener('click', MODIFIER.turn, false);
   },

   //CREATES AN ARRAY WITH THE EMPTY CELLS IN THE BOARD
   emptyCells(board) {
      let emptyCells = []
      for (let i = 0; i < board.length; i++) {
         if (board[i] !== DATA.ai && board[i] !== DATA.human) emptyCells.push(i);
      }
      return emptyCells;
   },

   //CHANGES THE GAMEMODE AT ANY TIME
   changeGameMode(mode) {
      DATA.difficultyMode = mode;
      VIEW.displayDifficulty();
   },

   //CHANGES THE ICON THE PLAYER PLAYS WITH
   changeWeapon(weapon) {
      if (weapon === "circle") {
         DATA.human = "O";
         DATA.ai = "X";
         DATA.humanSVG = CIRCLE;
         DATA.aiSVG = CROSS;
         VIEW.weaponDisplay();
      } else {
         DATA.human = "X";
         DATA.ai = "O";
         DATA.humanSVG = CROSS;
         DATA.aiSVG = CIRCLE;
         VIEW.weaponDisplay();
      }

   },

   //REMOVES THE EVENT LISTENER AND DISPLAYS THE CORRESPONDING MESSAGE
   gameOver(winning) {
      document.getElementById("main-game").removeEventListener('click', MODIFIER.turn, false);
      let winner = winning.player === DATA.human ? "YOU WIN!" : winning.player === DATA.ai ? "YOU LOSE!" : "IT'S A TIE!";
      VIEW.displayEndGame(winner);
   },

   //================CHECKING METHODS===================
   //===================================================

   //CHECKS IF THERE IS A WINNING COMBO FOR THE PLAYER
   checkWin(board, player) {
      for (let i = 0; i < DATA.winComb.length; i++) {
         let currArr = DATA.winComb[i];
         if (board[currArr[0]] === player && board[currArr[1]] === player && board[currArr[2]] === player)
            return {
               index: i,
               player: player
            };
      }
      return null;
   },

   //CHECKS IF THERE IS NO MORE CELLS AVAILABLE AND CALLS A TIE IF THERE IS
   checkTie(board) {

      let emptyCells = board.filter(x => typeof x === `number`);
      if (emptyCells.length !== 0) {
         return false
      } else {
         return {
            player: `tie`,
            index: -1
         };
      }
   }
}



//tie turn method to modifier to avoid this becoming the event passed by the listener.
MODIFIER.turn = MODIFIER.turn.bind(MODIFIER);

//=====================================DOM EVENTS==============================
document.getElementById("main-game").addEventListener('click', MODIFIER.turn, false);


//CHANGE DIFFICULTY MODE
document.getElementById("easy-mode").addEventListener("click", () => MODIFIER.changeGameMode("easy"), false);
document.getElementById("hard-mode").addEventListener("click", () => MODIFIER.changeGameMode("hard"), false);
document.getElementById("normal-mode").addEventListener("click", () => MODIFIER.changeGameMode("normal"), false);


//CHANGE ICON TO PLAY WITH
document.getElementById("cross-icon").addEventListener("click", () => MODIFIER.changeWeapon("cross"), false);
document.getElementById("circle-icon").addEventListener("click", () => MODIFIER.changeWeapon("circle"), false);

//RESET GAME
document.getElementById("reset").addEventListener("click", MODIFIER.resetGame, false);
//=================================================