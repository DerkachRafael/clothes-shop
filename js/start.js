"use strict";
window.addEventListener('DOMContentLoaded', function () {
    new ToggleMenu();
    initSlider();

});
function ToggleMenu() {
    this.navBtn = document.querySelector('.js-nav-btn');
    this.navBtn.addEventListener('click', this.clickHandler);
};

ToggleMenu.prototype.clickHandler = function () {
    this.bar = document.querySelector(".nav-btn__bar");
    this.bar.classList.toggle("animate");
    this.nav = document.querySelector(".nav");
    if (this.nav.style.maxHeight) {
        this.nav.style.maxHeight = null;
    } else {
        this.nav.style.maxHeight = this.nav.scrollHeight + "px";
    }
};

function initSlider() {
    //define a slider object
    function Slider(element) {
        this.element = element;
        this.slides = this.element.querySelector('.b-slider__list').getElementsByClassName('b-slider__item');
        this.slidesNumber = this.slides.length;
        // this.arrowsNavigation = this.element.querySelector('.slider-navigation');
        this.dotsNavigation = this.element.querySelector('.slider-dots-navigation');
        this.dots = this.dotsNavigation.getElementsByTagName('a');

        this.selectedSlide = 0;
        this.prevSelectedSlide = 0;
        // this.intervalId;
        //check if mouse is over the slide element
        this.hovered = false;

        this.bindEvents();
        // this.initAutoPlay();
    }

    Slider.prototype.bindEvents = function () {
        let self = this;
        //detect click on arrows
        // this.arrowsNavigation.addEventListener('click', function(event){
        //     if( event.target.tagName.toLowerCase() == 'a' ) {
        //         event.preventDefault();
        //         //determine new slide index
        //         var newSlideIndex = ( event.target.classList.contains('next') )
        //             ? self.selectedSlide + 1
        //             : self.selectedSlide - 1;
        //
        //         self.showNewSlide(newSlideIndex);
        //     }
        // });
        //detect click on dots navigation
        this.dotsNavigation.addEventListener('click', function (event) {
            if (event.target.tagName.toLowerCase() == 'a') {
                event.preventDefault();
                //determine new slide index
                let newSlideIndex = elementIndex(event.target.parentElement);
                self.showNewSlide(newSlideIndex);
            }
        });
        //stop autoplay while hovering over the slider
        this.element.addEventListener('mouseenter', function () {
            self.hover = true;
            // clearInterval(self.intervalId);
        });
        //initialize autoplay when leaving the slider
        this.element.addEventListener('mouseleave', function () {
            self.hover = false;
            // self.initAutoPlay();
        });
    };

    // Slider.prototype.initAutoPlay = function() {
    //     let self = this;
    //     this.intervalId = setInterval(function(){
    //         self.showNewSlide(self.selectedSlide + 1);
    //     }, 5000);
    // }

    Slider.prototype.showNewSlide = function (index) {
        // clearInterval(this.intervalId);
        if (index < 0) index = this.slidesNumber - 1;
        if (index > this.slidesNumber - 1) index = 0;
        this.prevSelectedSlide = this.selectedSlide;
        this.selectedSlide = index;

        for (let i = 0; i < this.slidesNumber; i++) {
            if (i < this.selectedSlide) {
                this.slides[i].classList.add('move-left');
                this.slides[i].classList.remove('selected', 'visible');
                this.dots[i].classList.remove('selected');
            } else if (i == this.selectedSlide) {
                this.slides[i].classList.add('selected');
                this.slides[i].classList.remove('move-left');
                this.dots[i].classList.add('selected');
            } else {
                this.slides[i].classList.remove('selected', 'move-left', 'visible');
                this.dots[i].classList.remove('selected');
            }
        }

        this.slides[this.prevSelectedSlide].classList.add('visible');

        // if( !this.hover ) this.initAutoPlay();
    };

    function elementIndex(element) {
        let siblings = element.parentElement.children;
        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] == element) return i;
        }
        return -1;
    }

    let sliders = document.getElementsByClassName('b-slider');
    for (let i = 0; i < sliders.length; i++) {
        (function (i) {
            new Slider(sliders[i]);
        }(i));
    }



};
