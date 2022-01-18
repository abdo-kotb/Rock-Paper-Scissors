import { gameContainer } from './mainView.js';

const renderComHTML = function () {
  const html = `
    <div class="part com-picked">
      <img class="game-part" />
    </div>
    `;
  gameContainer.insertAdjacentHTML('beforeend', html);
};

const createComProbs = function (comName, comEl, comImg) {
  setTimeout(() => {
    comEl.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    comEl.classList.add(`${comName}-container`);
    comImg.src = `images/icon-${comName}.svg`;
    comImg.classList.add(`${comName}`);
    comImg.alt = `${comName}`;
  }, 3000);
};

export const renderComPicked = function (com) {
  renderComHTML();

  const comSide = document.querySelector('.com-picked');
  const comImg = comSide.querySelector('img');

  createComProbs(com, comSide, comImg);
};
