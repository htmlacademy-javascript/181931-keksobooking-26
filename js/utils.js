const MIN_PROMT_TEXT = 'Минимальное число должно быть больше или равно 0';
const MAX_PROMT_TEXT = 'Максимальное число должно быть больше минимального';

function getRandomPositiveNumber(min, max) {
  if (min < 0) {
    return MIN_PROMT_TEXT;
  }
  if (max <= min) {
    return MAX_PROMT_TEXT;
  }
  min = Math.floor(min);
  max = Math.round(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPositiveFloatNumber(min, max, count) {
  if (min < 0) {
    return MIN_PROMT_TEXT;
  }
  if (max <= min) {
    return MAX_PROMT_TEXT;
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

const inclineWord = (value, words) => {
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

const disableForm = (element, toggleClass) => {
  element.classList.add(toggleClass);
  element.querySelectorAll('input, select, textarea').forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
};

const enableForm = (element, toggleClass) => {
  element.classList.remove(toggleClass);
  element.querySelectorAll('input, select, textarea').forEach((item) => {
    item.removeAttribute('disabled');
  });
};

const changePlaceholderAndAttr = (element, targetEl, price, PriceRange) => {
  setAttributes(element, {
    placeholder: price[targetEl.value],
    min: price[targetEl.value],
    max: PriceRange,
  });
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

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
  inclineWord,
  disableForm,
  enableForm,
  changePlaceholderAndAttr,
  debounce,
};
