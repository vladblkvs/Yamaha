'use strict';

var slides = document.querySelectorAll('.specs__slides-item');
var specsItems = document.querySelectorAll('.specs__item');
var sliderToggles = document.querySelectorAll('.specs__btn');

var toggleSlide = function () {
 sliderToggles.forEach(function (toggle, i) {
   toggle.addEventListener('click', function (evt) {
     evt.preventDefault();
     for (var j = 0; j < specsItems.length; j++) {
       specsItems[j].classList.remove('specs__item--active');
       slides[j].classList.remove('specs-slide--active');
     }
     specsItems[i].classList.add('specs__item--active');
     slides[i].classList.add('specs-slide--active');
   });
 });
};
toggleSlide();
