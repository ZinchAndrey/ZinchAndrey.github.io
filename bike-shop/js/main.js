'use strict';

// сайдбар с фильтрами на странице каталога
var sidebar = document.querySelector('.sidebar');
var sidebarContainer = document.querySelector('.catalog__sidebar-container');
var filters = document.querySelector('.toolbar__item-link--mob');
var filterCloseButton = document.querySelector('.sidebar__close-button');
var catalog = document.querySelector('.catalog');
var product = document.querySelector('.product');

// открытие / закрытие сайдбара с фильтрами
// убирает сайдбар из потока и закрывает его при включ js
if (catalog) {
  sidebar.classList.add('sidebar--closed');
  catalog.classList.remove('catalog--no-js');

  filters.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar--closed');
    sidebarContainer.classList.toggle('catalog__sidebar-container--opened');
    bodyContainer.classList.add('body-container--menu-opened');
    // bodyContainer.classList.toggle('body-container--menu-opened');
  });

  filterCloseButton.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar--closed');
  });

  sidebarContainer.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      sidebar.classList.add('sidebar--closed');
      bodyContainer.classList.remove('body-container--menu-opened');
      sidebarContainer.classList.remove('catalog__sidebar-container--opened');
    }
  });

  // открытие / закрытие аккордеона
  var filterName = document.querySelectorAll('.sidebar__legend-button');

  for (var i = 0; i < filterName.length; i++) {
    filterName[i].addEventListener('click', function (event) {
      event.preventDefault();
      event.target.classList.toggle('sidebar__legend-button--closed');
      event.target.parentElement.nextElementSibling.classList.toggle('closed');
    });
  }
}

// открытие / закрытие меню в моб версии
var nav = document.querySelector('.nav');
var menuCloseButton = document.querySelector('.nav__button-close');
var menuOpenButton = document.querySelector('.page-header__menu-button');
var bodyContainer = document.querySelector('.body-container');
var navContainer = document.querySelector('.page-header__nav-container');

// закрывает меню и убираем его из потока при работающем js
nav.classList.remove('nav--no-js');
nav.classList.add('nav--closed');

menuOpenButton.addEventListener('click', function () {
  nav.classList.remove('nav--closed');
  bodyContainer.classList.add('body-container--menu-opened');
  navContainer.classList.add('page-header__nav-container--menu-opened');
  // закроет сайдбар с фильтрами, если они открыты
  if (sidebar) {
    if (sidebar.classList.contains('sidebar--closed') === false) {
      sidebar.classList.add('sidebar--closed');
    }
  }
});

menuCloseButton.addEventListener('click', function () {
  nav.classList.add('nav--closed');
  bodyContainer.classList.remove('body-container--menu-opened');
  navContainer.classList.remove('page-header__nav-container--menu-opened');
});

navContainer.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    nav.classList.add('nav--closed');
    bodyContainer.classList.remove('body-container--menu-opened');
    navContainer.classList.remove('page-header__nav-container--menu-opened');
  }
});


// переключение цветов в карточке товара

var colorButton = document.querySelectorAll('.product__color-button');

if (colorButton) {
  for (i = 0; i < colorButton.length; i++) {
    colorButton[i].addEventListener('click', function (event) {
      event.preventDefault();
      for (i = 0; i < colorButton.length; i++) {
        colorButton[i].classList.remove('product__color-button--active');
      }
      event.target.classList.toggle('product__color-button--active');
    });
  }
}

// слайдер slick
// слайдер с великами
// eslint-disable-next-line no-undef
if (window.jQuery) {
  $('.slider-block__list--bikes').slick({ // eslint-disable-line no-undef
    // centerMode: true,
    centerPadding: '200px',
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          centerPadding: '50px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '100px',
          slidesToScroll: 2,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '0px',
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  });
}
// $('.slider-block__list--bikes').slick('slickSetOption', 'slidesToScroll', 3, true); // eslint-disable-line no-undef


// слайдер с аксессуарами
if (window.jQuery) { // eslint-disable-line no-undef
  $('.slider-block__list--details').slick({ // eslint-disable-line no-undef
    // centerMode: true,
    centerPadding: '200px',
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          centerPadding: '50px',
          // slidesToShow: 3
        }
      },
      {
        breakpoint: 1023,
        settings: {
          centerPadding: '100px',
          slidesToScroll: 2,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '0px',
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  });
}
// $('.slider-block__list--details').slick('slickSetOption', 'slidesToScroll', 4, true); // eslint-disable-line no-undef

// переключение вкладок в карточке товара
var tabs = document.querySelectorAll('.spec__nav-item');
var specs = document.querySelectorAll('.spec__review');

if (product) {
  for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
      event.preventDefault();
      for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('spec__nav-item--active');
      }
      event.target.classList.add('spec__nav-item--active');
      for (i = 0; i < specs.length; i++) {
        specs[i].classList.add('spec__review--closed');
      }
      event.target.nextElementSibling.classList.remove('spec__review--closed');
    });
  }
}

