import { disableForm, enableForm } from './utils.js';
const form = document.querySelector('.ad-form');

const disableAdForm = () => {
  disableForm(form, 'ad-form--disabled');
};

const enableAdForm = () => {
  enableForm(form, 'ad-form--disabled');
};

const enableAdFromValidation = () => {
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error-text',
  });

  const titleField = form.querySelector('#title');

  const TitleLengthRange = {
    MIN: 30,
    MAX: 100,
  };

  const validateTitle = (value) =>
    value.length >= TitleLengthRange.MIN &&
    value.length <= TitleLengthRange.MAX;

  pristine.addValidator(
    titleField,
    validateTitle,
    `От ${TitleLengthRange.MIN} до ${TitleLengthRange.MAX} символов`
  );

  const amountField = form.querySelector('#price');
  const maxPrice = {
    min: 0,
    max: 100000,
  };

  const validateAmount = (value) =>
    value > maxPrice.min && value <= maxPrice.max;

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
  });
};

export { disableAdForm, enableAdForm, enableAdFromValidation };
