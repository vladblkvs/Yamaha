'use strict';

document.querySelector('body').removeAttribute('data-nojs');

// slider
var toggleSlide = function () {
  var slides = document.querySelectorAll('.slider__item');
  var sliderMenuItem = document.querySelectorAll('.slider__menu-item');
  var sliderToggles = document.querySelectorAll('.slider__btn');

  sliderToggles.forEach(function (toggle, i) {
    toggle.addEventListener('click', function (evt) {
      evt.preventDefault();
      for (var j = 0; j < sliderMenuItem.length; j++) {
        sliderMenuItem[j].classList.remove('slider__menu-item--active');
        slides[j].classList.remove('slider__item--active');
      }
      sliderMenuItem[i].classList.add('slider__menu-item--active');
      slides[i].classList.add('slider__item--active');
    });
  });
};

toggleSlide();

// search form
var searchForm = document.querySelector('.search-form');
var searchBtn = searchForm.querySelector('.search-form__btn:not(.search-form__btn--close)');
var searchCloseBtn = searchForm.querySelector('.search-form__btn--close');
var searchInputField = searchForm.querySelector('.search-form__field');
var mainNav = document.querySelector('.main-nav');

var onSearchBtnClick = function () {
  if (searchForm.classList.contains('search-form--active') || window.matchMedia("(max-width: 767px)").matches) {
    searchForm.submit();
  } else {
    openSearchForm();
    searchInputField.focus();
  };
};

var openSearchForm = function () {
  mainNav.classList.add('main-nav--hidden');
  searchForm.classList.add('search-form--active');
  searchCloseBtn.addEventListener('click', closeSearchForm);
};

var closeSearchForm = function () {
  mainNav.classList.remove('main-nav--hidden');
  searchForm.classList.remove('search-form--active');
  searchCloseBtn.removeEventListener('click', closeSearchForm);
  searchForm.reset();
};

searchInputField.addEventListener('focus', openSearchForm);

searchBtn.addEventListener('click', onSearchBtnClick);

// mobile-menu
var pageHeader = document.querySelector('.page-header');
var menuButton = pageHeader.querySelector('.page-header__menu-btn');

var onMenuButtonClick = function () {
  pageHeader.classList.toggle('page-header--expended');
  closeSearchForm();
  menuButton.blur();
};

menuButton.addEventListener('click', onMenuButtonClick);
