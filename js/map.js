import { enableAdForm } from './form.js';
import { OFFERS } from './test-data.js';
import { createCardElement } from './create-card.js';

const mainPin = {
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
};

const adPin = {
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
};

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableAdForm();
    })
    .setView(
      {
        lat: 35.652832,
        lng: 139.839478,
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
    iconAnchor: [mainPin.iconSize / 2, mainPin.iconSize / 2],
  });

  const marker = L.marker(
    {
      lat: 35.652832,
      lng: 139.839478,
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
    iconAnchor: [adPin.iconSize / 2, adPin.iconSize / 2],
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

  OFFERS.forEach((point) => {
    createMarker(point);
  });
};

export { initMap };
