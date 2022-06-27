import { OFFERS } from './test-data.js';
import { createCardElement } from './create-card.js';
import {
  disableAdForm,
  enableAdForm,
  enableAdFromValidation,
  TypePrice,
  PriceRange,
} from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';
import { changePlaceholderAndAttr } from './utils.js';
import './form.js';

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
  enableAdForm();
  enableFilterForm();
  enableAdFromValidation();

  const similarListFragment = document.createDocumentFragment();
  const mapCanvas = document.querySelector('.map__canvas');

  OFFERS.forEach((offer) =>
    similarListFragment.append(createCardElement(offer))
  );
  mapCanvas.appendChild(similarListFragment);

  houseTypeField.addEventListener('change', () => {
    changePlaceholderAndAttr(
      formPriceField,
      houseTypeField,
      TypePrice,
      PriceRange.max
    );
  });
});
