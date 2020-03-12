'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var HOUSE_SETTINGS = {
    'palace': {
      label: 'Дворец',
      placeholder: MIN_PRICE_PALACE,
      min: MIN_PRICE_PALACE
    },
    'flat': {
      label: 'Квартира',
      placeholder: MIN_PRICE_FLAT,
      min: MIN_PRICE_FLAT
    },
    'house': {
      label: 'Дом',
      placeholder: MIN_PRICE_HOUSE,
      min: MIN_PRICE_HOUSE
    },
    'bungalo': {
      label: 'Бунгало',
      placeholder: MIN_PRICE_BUNGALO,
      min: MIN_PRICE_BUNGALO
    }
  };

  var hotelType = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var capacityInput = document.querySelector('#capacity');
  var roomNumberInput = document.querySelector('#room_number');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var mainSection = document.querySelector('main');
  var notice = document.querySelector('.notice');


  var fieldSets = document.querySelectorAll('fieldset');

  setDisableFieldset();

  syncField(timeIn, timeOut);
  syncField(timeOut, timeIn);

  hotelType.addEventListener('change', function () {
    var selectedValue = hotelType.value;
    var selectedSettings = HOUSE_SETTINGS[selectedValue];
    var attributes = Object.keys(selectedSettings);

    attributes.forEach(function (item) {
      var attribute = item;
      var value = selectedSettings[attribute];
      minPrice.setAttribute(attribute, value);
    });
  });

  // синхронизация количества комнат и вместительности

  roomNumberInput.addEventListener('change', function () {
    validateRoom();
  });

  capacityInput.addEventListener('change', function () {
    validateRoom();
  });

  function setDisableFieldset() {
    fieldSets.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  }

  function syncField(fieldFrom, fieldTo) {
    fieldFrom.addEventListener('change', function () {
      fieldTo.value = fieldFrom.value;
    });
  }

  function removeDisableAttribute() {
    fieldSets.forEach(function (item) {
      item.removeAttribute('disabled', '');
    });
  }

  function validateRoom() {
    capacityInput.setCustomValidity('');

    if (roomNumberInput.value === '1') {
      if (capacityInput.value === '3' || capacityInput.value === '2' || capacityInput.value === '0') {
        capacityInput.setCustomValidity('для одной комнаты доступен только вариант "для 1 гостя"');
      }
    } else if (roomNumberInput.value === '2') {
      if (capacityInput.value === '3' || capacityInput.value === '0') {
        capacityInput.setCustomValidity('для 2х комнат доступены варианты "«для 2 гостей» или «для 1 гостя»');
      }
    } else if (roomNumberInput.value === '3') {
      if (capacityInput.value === '0') {
        capacityInput.setCustomValidity('для 3х комнат доступены варианты «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
    } else if (roomNumberInput.value === '100') {
      if (capacityInput.value === '3' || capacityInput.value === '2' || capacityInput.value === '1') {
        capacityInput.setCustomValidity('для 100 комнат доступен только вариант "не для гостей"');
      }
    }
  }

  // функции успешной и неуспешной отправки формы

  function onCloseEsc(evt, element) {
    if (evt.keyCode === window.card.ESC_KEYCODE && element) {
      mainSection.removeChild(element);
      document.removeEventListener('keydown', onCloseEsc);
    }
  }

  function onCloseClick(block) {
    block.addEventListener('click', function () {
      block.remove();
    });
  }

  function showSuccessMessage() {
    var successMessage = templateSuccess.cloneNode(true);

    mainSection.insertBefore(successMessage, notice);

    document.addEventListener('keydown', function (evt) {
      var element = mainSection.querySelector('.success');
      onCloseEsc(evt, element);
    });

    // - убирает окно по клику на произв область
    var successBlock = document.querySelector('.success');
    onCloseClick(successBlock);
  }

  function showErrorMessage() {
    var errorMessage = templateError.cloneNode(true);

    mainSection.insertBefore(errorMessage, notice);

    document.addEventListener('keydown', function (evt) {
      var element = mainSection.querySelector('.error');
      onCloseEsc(evt, element);
    });

    // - убирает окно по клику на произв область
    var errorBlock = document.querySelector('.error');
    onCloseClick(errorBlock);
  }

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {

    validateRoom();

    evt.preventDefault();

    if (form.checkValidity()) {
      window.backend.upload(new FormData(form), function () {
        form.reset();
        window.map.disabledMap();
        showSuccessMessage();
      }, function () {
        showErrorMessage();
        window.map.disabledMap();
      });
    } else {
      form.reportValidity();
    }
  });

  window.form = {
    removeDisableAttribute: removeDisableAttribute,
    HOUSE_SETTINGS: HOUSE_SETTINGS
  };
})();
