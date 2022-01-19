import { SELECTIONS, randomSelection } from './model.js';

import { initGame } from './view/initGameView.js';
import { initModal } from './view/viewModal.js';

import { gameContainer } from './view/mainView.js';

import { renderComPicked } from './view/computerView.js';
import { renderGameOver, resetGame } from './view/gameOverView.js';
import global from './view/gameOverView.js';

// initaiate the game
const initApp = function () {
  initGame(SELECTIONS, global.score);
  initModal();
};

initApp();

const mainGameProcess = function (selected) {
  const computerSelect = randomSelection();

  renderComPicked(computerSelect.name);
  setTimeout(() => {
    renderGameOver(selected, computerSelect);
  }, 3000);
  resetGame(SELECTIONS);
};

gameContainer.addEventListener('click', function (e) {
  const targetBtn = e.target.closest('[data-selected]');
  if (!targetBtn) return;
  const gameBtns = document.querySelectorAll('[data-selected]');

  const { selected } = targetBtn.dataset;
  const selectedObj = SELECTIONS.find(part => part.name === selected);

  gameContainer.style.backgroundImage = 'unset';
  targetBtn.classList.add('user-picked');
  targetBtn.removeAttribute('data-selected');

  gameBtns.forEach(el => el !== targetBtn && el.remove());

  mainGameProcess(selectedObj);
});
