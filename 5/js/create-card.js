import { createPlaces, TYPE } from './test-data.js';
import { createElement } from './utils.js';

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const similarListFragment = document.createDocumentFragment();

const similarListElement = document.querySelector('.map__canvas');
const similarPlaces = Array.from({ length: 1 }, createPlaces);

similarPlaces.forEach(({ offer, author }) => {
  const cardElement = cardTemplate.cloneNode(true);
  createElement(cardElement, '.popup__title', offer.title);
  createElement(cardElement, '.popup__text--address', offer.address);
  createElement(cardElement, '.popup__text--price', offer.price);
  createElement(cardElement, '.popup__type', TYPE[offer.type]);
  createElement(
    cardElement,
    '.popup__text--capacity',
    `${offer.rooms} комнаты для ${offer.guests} гостей`
  );
  createElement(
    cardElement,
    '.popup__text--time',
    `${offer.checkin}, выезд до ${offer.checkout}`
  );
  const offerFeatures = cardElement.querySelector('.popup__features');
  const offerFeaturesItems = offerFeatures.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map(
    (featureItem) => `popup__feature--${featureItem}`
  );
  offerFeaturesItems.forEach((offerFeaturesItem) => {
    const modifier = offerFeaturesItem.classList[1];

    if (!modifiers.includes(modifier)) {
      offerFeaturesItem.remove();
    }
  });

  createElement(cardElement, '.popup__description', offer.description);

  const photosContainer = cardElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';

  if (offer.photos.length > 0) {
    for (let i = 0; i < offer.photos.length; i++) {
      photosContainer.insertAdjacentHTML(
        'afterbegin',
        `<img src="${offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      );
    }
  }

  const offerAvatar = cardElement.querySelector('.popup__avatar');
  offerAvatar.setAttribute('src', author.avatar);

  similarListFragment.appendChild(cardElement);
});

similarListElement.appendChild(similarListFragment);
