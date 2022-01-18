const mainContainer = document.querySelector('.main-container');
const modalBtn = document.querySelector('.rules');

// function that renders the modal HTML elements to the page
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

const closeModalFromBtn = function (e) {
  const closeBtn = e.target.closest('.modal-close');
  if (!closeBtn) return;

  const modal = document.querySelector('.modal');
  closeModal(modal);
};

const closeModalFromKey = function (e) {
  if (document.querySelector('.modal') && e.key === 'Escape')
    closeModal(document.querySelector('.modal'));
};

export const initModal = function () {
  // open the modal when clicking on the rules button
  modalBtn.addEventListener('click', openModal);

  // access modal closing button using event delegation
  mainContainer.addEventListener('click', closeModalFromBtn);

  // close the modal using the escape key
  document.addEventListener('keydown', closeModalFromKey);
};
