'use strict';

(function () {
  var NOT_FOUND_STATUS = 404;
  var INVALID_STATUS = 400;
  var OK_STATUS = 200;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  function xhrSend(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else if (xhr.status === INVALID_STATUS) {
        onError('Неверный запрос');
      } else if (xhr.status === NOT_FOUND_STATUS) {
        onError('Ничего не найдено');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  }

  function load(onLoad, onError) {
    var xhr = xhrSend(onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  }

  function upload(data, onLoad, onError) {
    var xhr = xhrSend(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  };
})();
