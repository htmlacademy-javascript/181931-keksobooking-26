import { OFFERS } from './test-data.js';
import { createCardElement } from './create-card.js';
import { disableAdForm, enableAdForm } from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  disableAdForm();
  enableAdForm();

  disableFilterForm();
  enableFilterForm();

  const similarListFragment = document.createDocumentFragment();
  const mapCanvas = document.querySelector('.map__canvas');

  OFFERS.forEach((offer) =>
    similarListFragment.append(createCardElement(offer))
  );
  mapCanvas.appendChild(similarListFragment);
});
