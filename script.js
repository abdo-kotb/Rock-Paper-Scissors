'use strict';

const SELECTIONS = [
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
  {
    name: 'rock',
    beats: 'scissors',
  },
];

const gameContainer = document.querySelector('.game-container');
const scoreEl = document.querySelector('.score');
let score = 0;

const initGame = function () {
  gameContainer.innerHTML = '';
  gameContainer.classList.remove('over');

  SELECTIONS.forEach(part => {
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

  scoreEl.innerText = score;
};
initGame();

const randomSelection = function () {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
};

const makeSelection = function (selected) {
  const computerSelect = randomSelection();

  renderComPicked(computerSelect.name);
  setTimeout(() => {
    renderGameOver(selected, computerSelect);
  }, 3000);
  resetGame();
};

const resetGame = function () {
  gameContainer.addEventListener('click', function (e) {
    const resetBtn = e.target.closest('#reset');
    if (!resetBtn) return;
    initGame();
  });
};

const renderGameOver = function (user, com) {
  gameContainer.classList.add('over');
  const userWin = user.beats === com.name;
  const comWin = user.name === com.beats;
  const userEl = document.querySelector('.user-picked');
  const comEl = document.querySelector('.com-picked');

  const html = `
    <div class="game-results">
      <h2 class="result text">${
        userWin ? 'You win' : comWin ? 'You lose' : 'Draw'
      }</h2>
      <button class="btn btn--white" id="reset">Play again</button>
    </div>
  `;
  gameContainer.insertAdjacentHTML('beforeend', html);

  if (userWin) {
    userEl.classList.add('won');
    score++;
  }
  if (comWin) {
    comEl.classList.add('won');
    score > 0 && score--;
  }
  scoreEl.innerText = score;
};

const renderComPicked = function (com) {
  const html = `
    <div class="part com-picked">
      <img class="game-part" />
    </div>
    `;
  gameContainer.insertAdjacentHTML('beforeend', html);

  const comSide = document.querySelector('.com-picked');
  const comImg = comSide.querySelector('img');

  setTimeout(() => {
    comSide.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    comSide.classList.add(`${com}-container`);
    comImg.src = `images/icon-${com}.svg`;
    comImg.classList.add(`${com}`);
    comImg.alt = `${com}`;
  }, 3000);
};

gameContainer.addEventListener('click', function (e) {
  const targetBtn = e.target.closest('[data-selected]');
  if (!targetBtn) return;
  const gameBtns = document.querySelectorAll('[data-selected]');

  const { selected } = targetBtn.dataset;
  const selectedObj = SELECTIONS.find(part => part.name === selected);

  gameContainer.style.backgroundImage = 'unset';
  targetBtn.classList.add('user-picked');
  gameBtns.forEach(el => {
    if (el !== targetBtn) el.remove();
  });
  makeSelection(selectedObj);
});

const mainContainer = document.querySelector('.main-container');
const modalBtn = document.querySelector('.rules');

const renderModal = function () {
  const html = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Rules</h2>
        <button class="modal-close btn" role="button" aria-label="close">
          <img src="images/icon-close.svg" alt="icon-close" />
        </button>
      </div>
      <div class="modal-content">
        <img
          class="modal-img"
          src="images/image-rules.svg"
          alt="rock beats scissors, scissors beat paper, paper beats rock"
        />
      </div>
    </div>
  `;

  mainContainer.insertAdjacentHTML('beforeend', html);
};

const openModal = function () {
  document.body.classList.add('overlay');
  renderModal();
};

const closeModal = function (modal) {
  document.body.classList.remove('overlay');
  modal.remove();
};

modalBtn.addEventListener('click', openModal);

mainContainer.addEventListener('click', function (e) {
  const closeBtn = e.target.closest('.modal-close');
  if (!closeBtn) return;

  const modal = closeBtn.closest('.modal');
  closeModal(modal);
});

document.addEventListener('keydown', function (e) {
  if (document.querySelector('.modal') && e.key === 'Escape')
    closeModal(document.querySelector('.modal'));
});
