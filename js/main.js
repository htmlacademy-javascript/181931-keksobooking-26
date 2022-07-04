import { disableAdForm } from './form.js';
import { enableAdForm } from './form.js';
import { disableFilterForm, enableFilterForm } from './filters.js';
import { enableMap } from './map.js';
import { getData, showError } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  disableAdForm();
  disableFilterForm();

  const { setMarkerMoveHandler, resetMarker, setMarkers } = await enableMap();

  enableAdForm(setMarkerMoveHandler, resetMarker);

  try {
    const offers = await getData();
    enableFilterForm();
    setMarkers(offers);
  } catch (err) {
    showError('Не удалось получить данные. Попробуйте ещё раз');
  }
});
