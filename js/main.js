import { disableAdForm } from './form.js';
import { enableAdForm } from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';
import { enableMap } from './map.js';
import { getData } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  disableAdForm();
  disableFilterForm();

  const { setMarkerMoveHandler, resetMarker, setMarkers } = await enableMap();

  enableAdForm(setMarkerMoveHandler, resetMarker);

  const offers = await getData();

  if (offers) {
    setMarkers(offers);
    enableFilterForm();
  }
});
