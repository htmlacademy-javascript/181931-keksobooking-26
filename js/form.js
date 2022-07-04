import { disableForm, enableForm, changePlaceholderAndAttr } from './utils.js';
import { sendData } from './api.js';
import { successPopup, errorPopup } from './popup.js';
const form = document.querySelector('.ad-form');

const TitleLengthRange = {
  MIN: 30,
  MAX: 100,
};

const PriceRange = {
  min: 0,
  max: 100000,
};

const TypePrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const disableAdForm = () => {
  disableForm(form, 'ad-form--disabled');
};
const enableValidation = (resetMarker) => {
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
    value >= TypePrice[placeFieldType.value] && value <= PriceRange.max;

  const getPriceErrorMessage = () =>
    `Минимальная цена ${TypePrice[placeFieldType.value]}. Максимальная цена — ${
      PriceRange.max
    }`;

  const sliderElement = document.querySelector('.ad-form__slider');

  noUiSlider.create(sliderElement, {
    range: {
      min: TypePrice[placeFieldType.value],
      max: PriceRange.max,
    },
    start: TypePrice[placeFieldType.value],
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceField.value = sliderElement.noUiSlider.get();
    pristine.validate(priceField);
  });

  pristine.addValidator(
    priceField,
    validatePrice,
    getPriceErrorMessage,
    90,
    true
  );

  placeFieldType.addEventListener('change', () => {
    pristine.validate(priceField);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: TypePrice[placeFieldType.value],
        max: PriceRange.max,
      },
      start: TypePrice[placeFieldType.value],
    });
  });

  priceField.addEventListener('change', () => {
    sliderElement.noUiSlider.set(priceField.value);
  });

  changePlaceholderAndAttr(
    priceField,
    placeFieldType,
    TypePrice,
    PriceRange.max
  );

  placeFieldType.addEventListener('change', () => {
    changePlaceholderAndAttr(
      priceField,
      placeFieldType,
      TypePrice,
      PriceRange.max
    );
  });

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

  roomsField.addEventListener('change', () => {
    pristine.validate(guestsField);
  });

  guestsField.addEventListener('change', () => {
    pristine.validate(roomsField);
  });

  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');

  timeIn.addEventListener('change', () => {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', () => {
    timeIn.value = timeOut.value;
  });

  const submitButton = form.querySelector('.ad-form__submit');

  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляю...';
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };

  const resetForm = () => {
    form.reset();
  };

  // const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          // onSuccess();
          unblockSubmitButton();
          successPopup().then(() => {
            resetMarker();
            resetForm();
          });
        },
        () => {
          errorPopup().then(() => {
            unblockSubmitButton();
          });
          // onFail();
        },
        new FormData(evt.target)
      );
    }
  });
  // };
};

const enableAdForm = (setMarkerMoveHandler, resetMarker) => {
  enableForm(form, 'ad-form--disabled');

  const addressField = form.querySelector('#address');
  addressField.setAttribute('readonly', 'readonly');
  setMarkerMoveHandler((coords) => {
    addressField.value = coords;
  });

  enableValidation(resetMarker);
  // resetMarker();
};

export {
  disableAdForm,
  enableAdForm,
  // resetForm,
  // setUserFormSubmit,
  TypePrice,
  PriceRange,
};
