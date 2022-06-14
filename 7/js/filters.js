import { disableForm, enableForm } from './utils.js';
const filters = document.querySelector('.map__filters');

const disableFilterForm = () => {
  disableForm(filters, 'map__filters--disabled');
};

const enableFilterForm = () => {
  enableForm(filters, 'map__filters--disabled');
};

export { disableFilterForm, enableFilterForm };
