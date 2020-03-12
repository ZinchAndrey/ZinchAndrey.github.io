'use strict';

(function () {
  var MAX_PINS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var housingType = document.querySelector('#housing-type');

  // на этот блок буду вешать обработчик change для отрисовки пинов
  var filtersForm = document.querySelector('.map__filters');

  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterCapacity = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var inputFeatures = filterFeatures.querySelectorAll('input');


  // ф-я, которая отображает изначальные отели
  function startHotels(hotels) {
    window.map.renderHotels(hotels.slice(0, MAX_PINS));
  }

  // Функция, которая получает массив пинов и генерирует из тех же пинов новый массив отфильтрованный по значениям фильтра
  function filterPins(pins) {
    var filteredPins = pins.filter(function (pin) {
      return (
        isPinTypeFiltered(pin) &&
        isPinPriceFiltered(pin) &&
        isPinRoomsFiltered(pin) &&
        isPinGuestFiltered(pin) &&
        isPinFeauturesFiltered(pin)
      );
    });
    return filteredPins;
  }

  // ф-я проверяет значение типа пина
  function isPinTypeFiltered(pin) {
    var filterTypeValue = housingType.value;
    return filterTypeValue === 'any' || filterTypeValue === pin.offer.type;
  }

  // ф-я проверяет значение по цене
  function isPinPriceFiltered(pin) {
    var filterPriceValue = filterPrice.value;
    return (
      (filterPriceValue === 'any') ||
      (filterPriceValue === 'low' && pin.offer.price < MIN_PRICE) ||
      (filterPriceValue === 'middle' && pin.offer.price > MIN_PRICE && pin.offer.price < MAX_PRICE) ||
      (filterPriceValue === 'high' && pin.offer.price > MAX_PRICE)
    );
  }

  // ф-я проверяет зн-е по количеству комнат
  // для приведения типов (через строку) использую parseInt
  function isPinRoomsFiltered(pin) {
    var filterRoomsValue = filterRooms.value;
    return (
      (filterRoomsValue === 'any') ||
      (parseInt(filterRoomsValue, 10) === pin.offer.rooms)
    );
  }

  // ф-я для проверки количества гостей
  // для приведения типов (через строку) использую parseInt
  function isPinGuestFiltered(pin) {
    var filterCapacityValue = filterCapacity.value;
    return (
      (filterCapacityValue === 'any') ||
      (parseInt(filterCapacityValue, 10) === pin.offer.guests)
    );
  }

  // метод создает новый массив на основе условия, если оно верное - то элемент добавляется в новый массив,
  // если нет - то он просто пропускает
  function isPinFeauturesFiltered(pin) {

  // Конструкция every проверяет каждый элемент на условие, возвращает true (если  каждый элемент удовлетворяет условию)
    return Array.from(inputFeatures).every(function (inputFeature) {

    // при инвертировании выражения, меняем знаки
      return !(inputFeature.checked && !pin.offer.features.includes(inputFeature.value));
    });
  }

  // создаю callback функцию с функцией debounce(), и в ней помещаю все действия связанные с отрисовкой пинов по фильтрам
  var filterChangeHandler = window.debounce(function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var pins = filterPins(window.map.hotels);
    window.map.removePins();
    window.map.renderHotels(pins.slice(0, MAX_PINS));
  });

  // Вызываю полученную callback функцию (с функцией устранение дребезга ('debounce()')) на событии формы с фильтрами
  filtersForm.addEventListener('change', filterChangeHandler);

  window.filter = {
    startHotels: startHotels,
    filterPins: filterPins
  };
})();
