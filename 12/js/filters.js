import { disableForm, enableForm } from './utils.js';

const filters = document.querySelector('.map__filters');
const placeType = document.querySelector('#housing-type');
const placePrice = document.querySelector('#housing-price');
const placeRooms = document.querySelector('#housing-rooms');
const placeGuests = document.querySelector('#housing-guests');

const PricesByValues = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
  any: {
    min: 0,
    max: 100000,
  },
};

const disableFilterForm = () => {
  disableForm(filters, 'map__filters--disabled');
};

const enableFilterForm = () => {
  enableForm(filters, 'map__filters--disabled');
};

const filterByLivingType = ({ offer }) => {
  if (placeType.value === 'any') {
    return offer;
  }
  if (offer.type === placeType.value) {
    return offer;
  }
};

const filterByRooms = ({ offer }) =>
  placeRooms.value === 'any' ? offer : offer.rooms === Number(placeRooms.value);

const filterByGuests = ({ offer }) =>
  placeGuests.value === 'any'
    ? offer
    : offer.guests === Number(placeGuests.value);

const filterByFeatures = ({ offer }) => {
  const filtersFeatures = [];
  const checkedFilters = document
    .querySelector('.map__features')
    .querySelectorAll('input:checked');
  checkedFilters.forEach((el) => filtersFeatures.push(el.value));
  if (offer.features) {
    return filtersFeatures.every((feature) => offer.features.includes(feature));
  }
  return false;
};

const filterByPrice = ({ offer }) =>
  offer.price >= PricesByValues[placePrice.value].min &&
  offer.price <= PricesByValues[placePrice.value].max;

const filterOffers = (offers) =>
  offers.filter(
    (offer) =>
      filterByLivingType(offer) &&
      filterByRooms(offer) &&
      filterByGuests(offer) &&
      filterByFeatures(offer) &&
      filterByPrice(offer)
  );

const resetFilters = () => {
  filters.reset();
};

export {
  disableFilterForm,
  enableFilterForm,
  filterOffers,
  filterByLivingType,
  resetFilters,
};
