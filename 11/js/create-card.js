import { TYPE, DECLENSIONS } from './test-data.js';
import {
  setElementContent,
  removeElement,
  setAttributes,
  numWord,
} from './utils.js';

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const createCardElement = ({ offer, author }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const createElement = (selector, text) => {
    if (text) {
      setElementContent(cardElement, selector, text);
    } else {
      removeElement(cardElement.querySelector(selector));
    }
  };

  createElement('.popup__title', offer.title);
  createElement('.popup__text--address', offer.address);
  createElement('.popup__text--price', `${offer.price}  ₽/ночь`);
  createElement('.popup__type', TYPE[offer.type]);
  createElement(
    '.popup__text--capacity',
    `${offer.rooms} ${numWord(offer.rooms, DECLENSIONS.rooms)} для ${
      offer.guests
    } ${numWord(offer.guests, DECLENSIONS.guests)} `
  );
  createElement(
    '.popup__text--time',
    `${offer.checkin}, выезд до ${offer.checkout}`
  );

  const offerFeatures = cardElement.querySelector('.popup__features');
  const offerFeaturesItems = offerFeatures.querySelectorAll('.popup__feature');

  if (offer.features) {
    const modifiers = offer.features.map(
      (featureItem) => `popup__feature--${featureItem}`
    );
    offerFeaturesItems.forEach((offerFeaturesItem) => {
      const modifier = offerFeaturesItem.classList[1];

      if (!modifiers.includes(modifier)) {
        offerFeaturesItem.remove();
      }
    });
  } else {
    removeElement(offerFeatures);
  }

  createElement('.popup__description', offer.description);

  const photosContainer = cardElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';

  if (offer.photos) {
    for (let i = 0; i < offer.photos.length; i++) {
      const photo = document.createElement('img');
      photo.classList.add('popup__photo');
      setAttributes(photo, {
        src: offer.photos[i],
        width: '45',
        height: '40',
        alt: 'Фотография жилья',
      });
      photosContainer.appendChild(photo);
    }
  } else {
    removeElement(cardElement.querySelector('.popup__photos'));
  }

  const offerAvatar = cardElement.querySelector('.popup__avatar');
  offerAvatar.setAttribute('src', author.avatar);

  return cardElement;
};

export { createCardElement };
