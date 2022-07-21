const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const closePopup = (element) => {
  element.remove();
  document.removeEventListener('click', onDocumentClick);
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onDocumentClick();
  }
};

function onDocumentClick() {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showPopup = (message) => {
  document.body.append(message);
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      onDocumentClick();
      closePopup(message);
      resolve();
    });
    document.addEventListener('keydown', (evt) => {
      onDocumentEscKeydown(evt);
      closePopup(message);
      resolve();
    });
  });
};

const successPopup = () => showPopup(successElement);

const errorPopup = () => {
  const errorButtonlClose = errorElement.querySelector('.error__button');

  errorButtonlClose.addEventListener('click', () => {
    onDocumentClick();
    closePopup(errorElement);
  });

  return showPopup(errorElement);
};

export { successPopup, errorPopup };
