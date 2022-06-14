import '../pristine/pristine.min.js';
import { disableForm, enableForm } from './utils.js';
const form = document.querySelector('.ad-form');

const disableAdForm = () => {
  disableForm(form, 'ad-form--disabled');
};

const enableAdForm = () => {
  enableForm(form, 'ad-form--disabled');
};

export { disableAdForm, enableAdForm };

form.setAttribute('action', 'https://26.javascript.pages.academy/keksobooking');
form.setAttribute('method', 'POST');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const titleField = form.querySelector('#title');
titleField.setAttribute('requred', '');

const maxSymbols = {
  min: 30,
  max: 100,
};

const validateTitle = (value) =>
  value.length >= maxSymbols.min && value.length <= maxSymbols.max;

pristine.addValidator(
  titleField,
  validateTitle,
  `От ${maxSymbols.min} до ${maxSymbols.max} символов`
);

const amountField = form.querySelector('#price');
amountField.setAttribute('requred', '');
const maxPrice = {
  min: 0,
  max: 100000,
};

const validateAmount = (value) => value > maxPrice.min && value <= maxPrice.max;

const getAmountErrorMessage = () => `Максимальное значение — ${maxPrice.max}`;

pristine.addValidator(amountField, validateAmount, getAmountErrorMessage);

const roomsField = form.querySelector('#room_number');
const guestsField = form.querySelector('#capacity');

const validateroomsFieldAndGuests = () =>
  (Number(roomsField.value) === 100 && Number(guestsField.value) === 0) ||
  (Number(guestsField.value) <= Number(roomsField.value) &&
    Number(roomsField.value) !== 100 &&
    Number(guestsField.value) !== 0);

pristine.addValidator(
  guestsField,
  validateroomsFieldAndGuests,
  'Количество гостей должно быть меньше или равно количеству комнат'
);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    return true;
  }
  evt.preventDefault();

  const errorText = form.querySelectorAll('.ad-form__error-text');
  errorText.forEach((text) => {
    text.style.color = '#c00';
  });
});
