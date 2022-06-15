import { OFFERS } from './test-data.js';
import { createCardElement } from './create-card.js';
import { disableAdForm, enableAdForm, enableAdFromValidation } from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  disableAdForm();
  disableFilterForm();

  enableAdForm();
  enableFilterForm();
  enableAdFromValidation();

  const similarListFragment = document.createDocumentFragment();
  const mapCanvas = document.querySelector('.map__canvas');

  OFFERS.forEach((offer) =>
    similarListFragment.append(createCardElement(offer))
  );
  mapCanvas.appendChild(similarListFragment);
});
