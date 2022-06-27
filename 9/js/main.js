import {
  disableAdForm,
  enableAdFromValidation,
  TypePrice,
  PriceRange,
} from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';
import { changePlaceholderAndAttr } from './utils.js';
import { initMap } from './map.js';

document.addEventListener('DOMContentLoaded', () => {
  disableAdForm();
  disableFilterForm();

  initMap();

  const formPriceField = document.querySelector('#price');
  const houseTypeField = document.querySelector('#type');

  changePlaceholderAndAttr(
    formPriceField,
    houseTypeField,
    TypePrice,
    PriceRange.max
  );
  enableFilterForm();
  enableAdFromValidation();

  houseTypeField.addEventListener('change', () => {
    changePlaceholderAndAttr(
      formPriceField,
      houseTypeField,
      TypePrice,
      PriceRange.max
    );
  });
});
