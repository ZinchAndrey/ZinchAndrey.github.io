'use strict';

// кастомный селект
var activeSelect = document.querySelector('.custom-select__active');
var selectList = document.querySelector('.custom-select__list');
// настоящий селект
var bookSelect = document.querySelector('#form__book-select');

// открывает и закрывает список кастомного select
function onCustomSelect() {
  activeSelect.addEventListener('click', function () {
    selectList.classList.toggle('custom-select__list--closed');
    activeSelect.classList.toggle('custom-select__active--closed');
    activeSelect.textContent = 'Выберите книгу';
    activeSelect.classList.remove('custom-select__active--darken');

    // добавляет фокус на список кредитов
    selectList.focus();
    onBlurSelect();
  });
}

// закрывает список кастомного select при расфокусе, задержка по времени нужна, чтобы одновременно не срабатывал blur и click на activeSelect
function onBlurSelect() {
  selectList.addEventListener('blur', function () {
    setTimeout(closeSelect, 100);
  });
}

// закрывает выпадалющий список
function closeSelect() {
  if (!selectList.classList.contains('custom-select__list--closed')) {
    selectList.classList.add('custom-select__list--closed');
  }
  if (!activeSelect.classList.contains('custom-select__active--closed')) {
    activeSelect.classList.add('custom-select__active--closed');
  }
}

// переключает кастомный и настоящий select
function makeActiveItem() {
  selectList.addEventListener('click', function (evt) {
    activeSelect.textContent = evt.target.textContent;
    bookSelect.value = evt.target.dataset.value;

    // закрывает список селектов при клике на один из item
    closeSelect();
    // добавляет класс изменения цвета
    activeSelect.classList.add('custom-select__active--darken');
  });
}

onCustomSelect();
makeActiveItem();

/* eslint-disable */
if (window.jQuery) {
  slickInit();
}

function slickInit() {
  $('.similar__slider-block').slick({ // eslint-disable-line no-undef
    dots: true,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          centerMode: true,
          centerPadding: '0px',
          slidesToScroll: 0,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          centerMode: true,
          centerPadding: '0px',
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  });
}

/* eslint-enable */
