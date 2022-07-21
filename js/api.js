const ALERT_SHOW_TIME = 5000;
const URL = 'https://26.javascript.pages.academy/keksobooking/';

const showError = (error) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'tomato';
  errorContainer.textContent = error;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getData = () =>
  fetch(`${URL}data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No data');
      }

      return response.json();
    })
    .catch(() => showError('Не удалось получить данные. Попробуйте ещё раз'));

const sendData = (onSuccess, onFail, body) => {
  fetch(URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
