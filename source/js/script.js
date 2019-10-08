'use strict';

document.querySelector('body').removeAttribute('data-nojs');

// slider
const toggleSlide = function () {
  let slides = document.querySelectorAll('.slider__item');
  let sliderMenuItem = document.querySelectorAll('.slider__menu-item');
  let sliderToggles = document.querySelectorAll('.slider__btn');

  sliderToggles.forEach(function (toggle, i) {
    toggle.addEventListener('click', function (evt) {
      evt.preventDefault();
      for (let j = 0; j < sliderMenuItem.length; j++) {
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
let searchForm = document.querySelector('.search-form');
let searchBtn = searchForm.querySelector('.search-form__btn:not(.search-form__btn--close)');
let searchCloseBtn = searchForm.querySelector('.search-form__btn--close');
let searchInputField = searchForm.querySelector('.search-form__field');
let mainNav = document.querySelector('.main-nav');
const MAX_MOBILE_WIDTH = 767;

const onSearchBtnClick = function () {
  if (searchForm.classList.contains('search-form--active') || window.matchMedia("(max-width: " + MAX_MOBILE_WIDTH + "px)").matches) {
    searchForm.submit();
  } else {
    openSearchForm();
    searchInputField.focus();
  };
};

const openSearchForm = function () {
  mainNav.classList.add('main-nav--hidden');
  searchForm.classList.add('search-form--active');
  searchCloseBtn.addEventListener('click', closeSearchForm);
  searchBtn.blur();
};

const closeSearchForm = function () {
  mainNav.classList.remove('main-nav--hidden');
  searchForm.classList.remove('search-form--active');
  searchCloseBtn.removeEventListener('click', closeSearchForm);
  searchForm.reset();
};

searchInputField.addEventListener('focus', openSearchForm);

searchBtn.addEventListener('click', onSearchBtnClick);

// mobile-menu
let pageHeader = document.querySelector('.page-header');
let menuButton = pageHeader.querySelector('.page-header__menu-btn');

const onMenuButtonClick = function () {
  pageHeader.classList.toggle('page-header--expended');
  closeSearchForm();
  menuButton.blur();
};

menuButton.addEventListener('click', onMenuButtonClick);
