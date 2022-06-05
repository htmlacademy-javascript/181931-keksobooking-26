import { createPlace, SIMILAR_PLACES_COUNT } from './test-data.js';

const similarPlaces = Array.from({ length: SIMILAR_PLACES_COUNT }, createPlace);

console.log(similarPlaces); // Для теста :)
