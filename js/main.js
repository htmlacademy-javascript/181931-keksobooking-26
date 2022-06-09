import { OFFERS } from './test-data.js';
import { createCardElement } from './create-card.js';
import './form.js';
import './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  const similarListFragment = document.createDocumentFragment();
  const mapCanvas = document.querySelector('.map__canvas');

  OFFERS.forEach((offer) =>
    similarListFragment.append(createCardElement(offer))
  );
  mapCanvas.appendChild(similarListFragment);
});
