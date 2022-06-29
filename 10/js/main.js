import {
  disableAdForm,
  setUserFormSubmit,
  TypePrice,
  PriceRange,
} from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';
import { changePlaceholderAndAttr } from './utils.js';
import './map.js';
import { successPopup, errorPopup } from './popup.js';

document.addEventListener('DOMContentLoaded', () => {
  disableAdForm();
  disableFilterForm();

  const formPriceField = document.querySelector('#price');
  const houseTypeField = document.querySelector('#type');

  changePlaceholderAndAttr(
    formPriceField,
    houseTypeField,
    TypePrice,
    PriceRange.max
  );
  enableFilterForm();

  setUserFormSubmit(successPopup, errorPopup);

  houseTypeField.addEventListener('change', () => {
    changePlaceholderAndAttr(
      formPriceField,
      houseTypeField,
      TypePrice,
      PriceRange.max
    );
  });
});
