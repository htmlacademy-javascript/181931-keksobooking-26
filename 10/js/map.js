import { enableAdForm } from './form.js';
import { SIMILAR_PLACES_COUNT } from './test-data.js';
import { getData, showError } from './api.js';
import { createCardElement } from './create-card.js';

const mainPin = {
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  lat: 35.652832,
  lng: 139.839478,
};

const adPin = {
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
};

const { lat, lng } = mainPin;
const map = L.map('map-canvas')
  .on('load', () => {
    setTimeout(() => {
      enableAdForm();
    }, 100);
  })
  .setView(
    {
      lat,
      lng,
    },
    10
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: mainPin.iconUrl,
  iconSize: mainPin.iconSize,
  iconAnchor: [mainPin.iconSize[0] / 2, mainPin.iconSize[1] / 2],
});

const marker = L.marker(
  {
    lat: mainPin.lat,
    lng: mainPin.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

marker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const adPinIcon = L.icon({
  iconUrl: adPin.iconUrl,
  iconSize: adPin.iconSize,
  iconAnchor: [adPin.iconSize[0] / 2, adPin.iconSize[1] / 2],
});

const createMarker = (point) => {
  const { location } = point;
  const adMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: adPinIcon,
    }
  );

  adMarker.addTo(markerGroup).bindPopup(createCardElement(point));
};

marker.on('dragend', () => {
  document.getElementById('address').value = ` ${marker
    .getLatLng()
    .lat.toFixed(5)}, ${marker.getLatLng().lng.toFixed(5)}`;
});

getData(
  (offers) => {
    offers.slice(0, SIMILAR_PLACES_COUNT).forEach((offer) => {
      createMarker(offer);
    });
  },
  () => showError('Не удалось получить данные. Попробуйте ещё раз')
);

const resetMarker = () => {
  marker.setLatLng({
    lat: mainPin.lat,
    lng: mainPin.lng,
  });
};

export { resetMarker };
