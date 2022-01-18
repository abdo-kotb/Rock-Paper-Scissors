import { gameContainer, scoreEl } from './mainView.js';
import { initGame } from './initGameView.js';

let score = 0;

// reneder game status and reset button on the page
const gameOverHTML = function (userStatus, comStatus) {
  const html = `
    <div class="game-results">
      <h2 class="result text">
        ${userStatus ? 'You win' : comStatus ? 'You lose' : 'Draw'}
      </h2>
      <button class="btn btn--white" id="reset">Play again</button>
    </div>
  `;
  gameContainer.insertAdjacentHTML('beforeend', html);
};

// check the game result and render the total result on the page
const renderGameScore = function (userWin, comWin) {
  const userEl = document.querySelector('.user-picked');
  const comEl = document.querySelector('.com-picked');

  if (userWin) {
    userEl.classList.add('won');
    score++;
  }
  if (comWin) {
    comEl.classList.add('won');
    if (score > 0) score--;
  }
  scoreEl.innerText = score;
};

export const renderGameOver = function (user, com) {
  gameContainer.classList.add('over');

  const userWin = user.beats === com.name;
  const comWin = user.name === com.beats;

  gameOverHTML(userWin, comWin);

  renderGameScore(userWin, comWin);
};

// reset game elements and persist the score
export const resetGame = function (gameObj) {
  gameContainer.addEventListener('click', function (e) {
    const resetBtn = e.target.closest('#reset');
    if (resetBtn) initGame(gameObj, score);
  });
};

export default { score };
