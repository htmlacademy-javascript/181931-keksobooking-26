const ALERT_SHOW_TIME = 5000;

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

const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking', {
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

export { getData, sendData, showError };
