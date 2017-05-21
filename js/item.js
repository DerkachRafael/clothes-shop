"use strict";

document.addEventListener('DOMContentLoaded', function () {
    new ToggleMenu();
    activateSlide();
});
function ToggleMenu() {
    this.navBtn = document.querySelector('.js-nav-btn');
    this.navBtn.addEventListener('click', this.clickHandler);
};

ToggleMenu.prototype.clickHandler = function () {
    this.bar = document.querySelector(".nav-btn__bar");
    console.log(this.bar);
    this.bar.classList.toggle("animate");
    this.nav = document.querySelector(".nav");
    if (this.nav.style.maxHeight) {
        this.nav.style.maxHeight = null;
    } else {
        this.nav.style.maxHeight = this.nav.scrollHeight + "px";
    }
};
//SLIDER
document.querySelector(".product-slider__list").addEventListener("click", changeImg);
function changeImg(event) {
    let target = event && event.target;
    let targetSrc = target.src;
    if (!targetSrc) {
        return;
    }
    let previewImg = document.querySelector(".preview-img");
    let a = previewImg.setAttribute("src", targetSrc);

    activateSlide();
}
//CHECK SRC
function activateSlide() {
    let itemsImg = document.querySelectorAll(".product-slider__img");
    let previewSrc = document.querySelector(".preview-img").src;
    itemsImg.forEach(function (element) {
        if (element.src === previewSrc) {
            console.log(element.parentElement);
            let parentImg = element.parentElement;
            let parentImgAccent = parentImg.classList.add("product-slider__item--accent");
            element.classList.add("product-slider__img--accent");
        }
        else {
            element.parentElement.classList.remove("product-slider__item--accent");
            element.classList.remove("product-slider__img--accent");
        }
    });
}


//ACTIVE ONCLICK
function initCurrent() {
    [].slice.call(document.querySelectorAll(".js-btn-wrap")).forEach(function (wrapBtn) {
        // let btnItems = [].slice.call(wrapBtn.querySelectorAll(".btn-sm"));
        let btnItems = document.querySelectorAll(".btn-sm");
        for(let i = 0; i < btnItems.length; i++){
            let buttons = btnItems[i];
        }
        let itemsTotal = btnItems.length;
        let setCurrent = function (item) {
            let currentItem = wrapBtn.querySelector(".btn-sm--selected");
            if (currentItem) {
                currentItem.classList.remove("btn-sm--selected")
            }
            item.classList.add("btn-sm--selected");
        };
        buttons.forEach(function (item) {
            item.addEventListener("click", function () {
                setCurrent(item);
            });
        });
    });
}

initCurrent();

//ADD TO BAG
let totalPrice = 0;
let totalProducts = 0;
let priceProduct = document.querySelector("[data-price]").getAttribute("data-price");
document.querySelector(".js-btn-bag").addEventListener("click", setInfoBag);
function setInfoBag() {
    totalProducts += 1;
    totalPrice = (totalProducts * priceProduct).toFixed(2);

    let infoBag = document.querySelector(".js-info-bag");
    infoBag.innerHTML = "total items: " + totalProducts + " and total price £ " + totalPrice;
}



