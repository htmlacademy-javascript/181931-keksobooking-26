import { SIMILAR_PLACES_COUNT } from './test-data.js';
import { createCardElement } from './create-card.js';
import { debounce } from './utils.js';
import { filterOffers } from './filters.js';

const RERENDER_DELAY = 500;

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

const { iconUrl, iconSize, lat, lng } = mainPin;

const enableMap = () =>
  new Promise((resolve) => {
    L.map('map-canvas')
      .on('load', function () {
        resolve(initMap(this));
      })
      .setView(
        {
          lat,
          lng,
        },
        10
      );
  });

function initMap(map) {
  const mainPinIcon = L.icon({
    iconUrl,
    iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
  });

  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
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

  const setMarkers = (offers) => {
    offers.slice(0, SIMILAR_PLACES_COUNT).forEach((offer) => {
      createMarker(offer);
    });

    const mapFiltersElement = document.querySelector('.map__filters');
    mapFiltersElement.addEventListener(
      'change',
      debounce(() => {
        markerGroup.clearLayers();
        const filterArr = filterOffers(offers);
        filterArr.slice(0, SIMILAR_PLACES_COUNT).forEach((offer) => {
          createMarker(offer);
        });
      }, RERENDER_DELAY)
    );
  };

  const resetMarker = () => {
    marker.setLatLng({
      lat: mainPin.lat,
      lng: mainPin.lng,
    });
  };

  const setMarkerMoveHandler = (cb) => {
    marker.on('dragend', () => {
      cb(
        ` ${marker.getLatLng().lat.toFixed(5)}, ${marker
          .getLatLng()
          .lng.toFixed(5)}`
      );
    });
  };

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return {
    setMarkerMoveHandler,
    resetMarker,
    setMarkers,
  };
}

export { enableMap };
