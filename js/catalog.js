"use strict";
window.addEventListener('DOMContentLoaded', function () {
    new ToggleMenu();
    // Initialize Sliders-price
    const sliderSections = document.getElementsByClassName("menu-list__range");
    for (let x = 0; x < sliderSections.length; x++) {
        let sliders = sliderSections[x].getElementsByTagName("input");
        for (let y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
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

function getVals() {
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
    if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    let displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = "£  " + slide1 + " - £ " + slide2;
}

