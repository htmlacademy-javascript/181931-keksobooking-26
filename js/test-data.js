import {
  getRandomPositiveFloatNumber,
  getRandomPositiveNumber,
  getRandomArrayElement,
  insertZeroBeforeDigit,
} from './utils.js';

const HOUSE_TITLE = [
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
const SIMILAR_PLACES_COUNT = 10;
const MIN_MAX_NUMBERS = {
  min: 1,
  max: 100,
};
const DESCRIPTIONS = [
  'Неуютное место за большие деньги',
  ' Та еще конура',
  'Это правда хорошее место',
];

const createPlace = () => {
  const placeFeaturesArr = PLACE_FEATURES.slice(
    0,
    getRandomPositiveNumber(0, PLACE_FEATURES.length)
  );
  const placePhotosArr = PLACE_PHOTOS.slice(
    0,
    getRandomPositiveNumber(0, PLACE_FEATURES.length)
  );
  const lat = getRandomPositiveFloatNumber(35.65, 35.7, 4);
  const lng = getRandomPositiveFloatNumber(139.7, 139.8, 4);

  const place = {
    author: {
      avatar: `img/avatars/user${insertZeroBeforeDigit(
        getRandomPositiveNumber(1, SIMILAR_PLACES_COUNT)
      )}.png`, // Не получилось придумать, как сделать так, чтобы значения не повторялись
    },
    offer: {
      title: getRandomArrayElement(HOUSE_TITLE),
      address: {
        lat: lat.toString(),
        lng: lng.toString(),
      },
      price: getRandomPositiveNumber(MIN_MAX_NUMBERS.min, MIN_MAX_NUMBERS.max),
      type: getRandomArrayElement(PLACE_TYPES),
      rooms: getRandomPositiveNumber(MIN_MAX_NUMBERS.min, MIN_MAX_NUMBERS.max),
      guests: getRandomPositiveNumber(MIN_MAX_NUMBERS.min, MIN_MAX_NUMBERS.max),
      checkin: getRandomArrayElement(PLACE_CHECHIN),
      checkout: getRandomArrayElement(PLACE_CHECHOUT),
      features: placeFeaturesArr,
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: placePhotosArr,
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };

  return place;
};

export { createPlace, SIMILAR_PLACES_COUNT };
