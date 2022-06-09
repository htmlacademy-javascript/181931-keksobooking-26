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

const setElementContent = (parentElem, elem, content) => {
  const element = parentElem.querySelector(elem);
  element.textContent = content;
};

const removeElement = (element) => {
  element.remove();
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
};

const disableForm = (element) => {
  element.classList.add('ad-form--disabled');
  element.querySelectorAll('input, select, textarea').forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
};

const enableForm = (element) => {
  element.classList.remove('ad-form--disabled');
  element.querySelectorAll('input, select, textarea').forEach((item) => {
    item.removeAttribute('disabled');
  });
};

export {
  getRandomPositiveNumber,
  getRandomPositiveFloatNumber,
  getRandomArrayElement,
  getRandomArrayElements,
  insertZeroBeforeDigit,
  createArray,
  getRandomNoRepeatValuesFromArray,
  setElementContent,
  removeElement,
  hideElement,
  setAttributes,
  numWord,
  disableForm,
  enableForm,
};
