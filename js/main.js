function getRandomPositiveFloatNumber(min, max) {
  if (min < 0) {
    min = 1;
  }
  if (max <= min) {
    max = min + 1;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPositiveNumber(min, max) {
  if (min < 0) {
    min = 1;
  }
  if (max >= min) {
    max = min + 1;
  }
  return Math.random() * (max - min) + min;
}

getRandomPositiveFloatNumber(-1.1, 30);
getRandomPositiveNumber(1, 2);
