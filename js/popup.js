import { resetMarker } from './map.js';
import { resetForm } from './form.js';

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

  const mapPopup = document.querySelector('.popup');
  if (mapPopup) {
    mapPopup.remove();
  }
  document.removeEventListener('click', onDocumentClick);
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onDocumentClick();
  }
};

function onDocumentClick() {
  // element.remove();

  // closePopup(element);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showPopup = (message) => {
  document.body.append(message);
  document.addEventListener('click', () => {
    onDocumentClick();
    closePopup(message);
    resetMarker();
    resetForm();
  });
  document.addEventListener('keydown', (evt) => {
    onDocumentEscKeydown(evt);
    closePopup(message);
    resetMarker();
    resetForm();
  });
};

const successPopup = () => {
  showPopup(successElement);
};

const errorPopup = () => {
  showPopup(errorElement);
  const errorButtonlClose = errorElement.querySelector('.error__button');

  errorButtonlClose.addEventListener('click', () => {
    onDocumentClick();
    closePopup(errorElement);
  });
  // onDocumentClick(errorPopupElement);
};

export { successPopup, errorPopup };
