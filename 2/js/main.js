function getRandomPositiveNumber(min, max) {
  if (min < 0) {
    return 'Минимальное число должно быть больше или равно 0';
  }
  if (max <= min) {
    return 'Максимальное число должно быть больше минимального';
  }
  min = Math.floor(min);
  max = Math.round(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPositiveFloatNumber(min, max, count) {
  if (min < 0) {
    return 'Минимальное число должно быть больше или равно 0';
  }
  if (max <= min) {
    return 'Максимальное число должно быть больше минимального';
  }
  return parseFloat((Math.random() * (max - min) + min).toFixed(count));
}

getRandomPositiveFloatNumber(1.111, 2.2, 2);
getRandomPositiveNumber(1.2, 3);
