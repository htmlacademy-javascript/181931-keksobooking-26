import {
  getRandomPositiveFloatNumber,
  getRandomPositiveNumber,
  getRandomArrayElement,
  getRandomArrayElements,
  insertZeroBeforeDigit,
  createArray,
  getRandomNoRepeatValuesFromArray,
} from './utils.js';

const SIMILAR_PLACES_COUNT = 10;
const MIN_MAX_NUMBERS = {
  min: 1,
  max: 100,
};
const IMAGE_NUMBERS = createArray(1, SIMILAR_PLACES_COUNT);
const HOUSE_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
const PLACE_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const PLACE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const PLACE_CHECHIN = ['12:00', '13:00', '14:00'];
const PLACE_CHECHOUT = ['12:00', '13:00', '14:00'];
const PLACE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Неуютное место за большие деньги',
  ' Та еще конура',
  'Это правда хорошее место',
];

const createPlaces = () => {
  const lat = getRandomPositiveFloatNumber(35.65, 35.7, 4);
  const lng = getRandomPositiveFloatNumber(139.7, 139.8, 4);

  const place = {
    author: {
      avatar: `img/avatars/user${insertZeroBeforeDigit(
        getRandomNoRepeatValuesFromArray(IMAGE_NUMBERS, 1)[0]
      )}.png`,
    },
    offer: {
      title: getRandomArrayElement(HOUSE_TITLES),
      address: `${lat.toString()} ${lng.toString()}`,
      price: getRandomPositiveNumber(MIN_MAX_NUMBERS.min, MIN_MAX_NUMBERS.max),
      type: getRandomArrayElement(PLACE_TYPES),
      rooms: getRandomPositiveNumber(MIN_MAX_NUMBERS.min, MIN_MAX_NUMBERS.max),
      guests: getRandomPositiveNumber(MIN_MAX_NUMBERS.min, MIN_MAX_NUMBERS.max),
      checkin: getRandomArrayElement(PLACE_CHECHIN),
      checkout: getRandomArrayElement(PLACE_CHECHOUT),
      features: getRandomArrayElements(PLACE_FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElements(PLACE_PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };

  return place;
};

export { createPlaces, TYPE };
