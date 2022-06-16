import { disableForm, enableForm } from './utils.js';
const form = document.querySelector('.ad-form');

const TitleLengthRange = {
  MIN: 30,
  MAX: 100,
};

const PriceRange = {
  min: 0,
  max: 100000,
};

const typePrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

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

  const validateTitle = (value) =>
    value.length >= TitleLengthRange.MIN &&
    value.length <= TitleLengthRange.MAX;

  pristine.addValidator(
    titleField,
    validateTitle,
    `От ${TitleLengthRange.MIN} до ${TitleLengthRange.MAX} символов`
  );

  const priceField = form.querySelector('#price');
  const placeFieldType = form.querySelector('#type');

  const validatePrice = (value) =>
    value >= typePrice[placeFieldType.value] && value <= PriceRange.max;

  // const getPriceErrorMessage = () =>
  //   `Минимальная цена ${typePrice[placeFieldType.value]}. Максимальная цена — ${
  //     PriceRange.max
  //   }`;
  // Хотел вывести кастомное сообщение, но выводится и кастомное и стандартное браузерное. Пока решил оставить только браузерное.

  pristine.addValidator(priceField, validatePrice);

  const roomsField = form.querySelector('#room_number');
  const guestsField = form.querySelector('#capacity');

  const validateRoomsFieldAndGuests = () =>
    (Number(roomsField.value) === 100 && Number(guestsField.value) === 0) ||
    (Number(guestsField.value) <= Number(roomsField.value) &&
      Number(roomsField.value) !== 100 &&
      Number(guestsField.value) !== 0);

  pristine.addValidator(
    guestsField,
    validateRoomsFieldAndGuests,
    'Количество гостей должно быть меньше или равно количеству комнат'
  );

  pristine.addValidator(
    roomsField,
    validateRoomsFieldAndGuests,
    'Количество комнат должно быть меньше или равно количеству гостей'
  );

  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');

  timeIn.addEventListener('change', () => {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', () => {
    timeIn.value = timeOut.value;
  });

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (isValid) {
      return true;
    }
    evt.preventDefault();
  });
};

export {
  disableAdForm,
  enableAdForm,
  enableAdFromValidation,
  typePrice,
  PriceRange,
};
