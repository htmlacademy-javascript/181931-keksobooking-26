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

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveNumber(0, elements.length - 1)];

const getRandomArrayElements = (elements) =>
  elements.slice(0, getRandomPositiveNumber(0, elements.length));

const insertZeroBeforeDigit = (digit) => {
  if (String(digit).length === 1) {
    return `0${digit}`;
  }
  return digit;
};

const createArray = (start, end) => {
  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

const getRandomNoRepeatValuesFromArray = (source, quantity) => {
  const randomValues = [];

  if (source.length < quantity) {
    return null;
  }

  for (let i = 0; i < quantity; i++) {
    const elements = source.splice(
      getRandomPositiveNumber(0, source.length - 1),
      1
    );
    randomValues.push(elements[0]);
  }

  return randomValues;
};

const createElement = (parentElem, elem, content) => {
  const element = parentElem.querySelector(elem);
  element.textContent = content;
};

export {
  getRandomPositiveNumber,
  getRandomPositiveFloatNumber,
  getRandomArrayElement,
  getRandomArrayElements,
  insertZeroBeforeDigit,
  createArray,
  getRandomNoRepeatValuesFromArray,
  createElement,
};
