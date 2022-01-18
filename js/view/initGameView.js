import { gameContainer, scoreEl } from './mainView.js';

/*
clear the container from any elements
reset the container classes to the inital state
*/
const clearContainer = function () {
  gameContainer.innerHTML = '';
  gameContainer.classList.remove('over');
};

//  render the game elements according to the game elements object
const initStateHTML = function (gameObj) {
  gameObj.forEach(part => {
    const { name } = part;
    const html = `
    <div class="part ${name}-container" data-selected="${name}">
        <img
          class="game-part ${name}"
          src="images/icon-${name}.svg"
          alt="${name}"
        />
    </div>
  `;
    gameContainer.insertAdjacentHTML('beforeend', html);
  });
};

export const initGame = function (gameObj, score) {
  clearContainer();

  initStateHTML(gameObj);

  //  apply the score and render it to the page
  scoreEl.innerText = score;
};
