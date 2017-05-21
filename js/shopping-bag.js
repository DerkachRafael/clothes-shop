"use strict";
window.addEventListener('DOMContentLoaded', function () {
    new ToggleMenu();
    getTotalPrice();
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

//GET TOTAL PRICE FROM PRODUCT
function getTotalPrice() {
    let productPrice = document.querySelectorAll(".product-description__price");
    if (productPrice.length == 0) {
        return;
    }
    let arrPrice = [];
    let totalPriceTxt = document.querySelector(".js-total-price");
    for (let i = 0; i < productPrice.length; i++) {
        let selfPrice = parseFloat(productPrice[i].innerHTML.replace(/[^\d\.]/, ''));
        arrPrice.push(selfPrice);
    }
    totalPriceTxt.innerHTML = "£ " + arrPrice.reduce(getSum);
}


function getSum(total, num) {
    return total + num;
}


function removeItems(btn, infoTxt) {
    let wrapProducts = document.querySelectorAll(".content-products");
    let totalPrice = document.querySelector(".js-total-price");
    for (let i = 0; i < wrapProducts.length; i++) {
        wrapProducts[i].parentNode.removeChild(wrapProducts[i]);
        totalPrice.textContent = "0";
        infoTxt.style.display = "block";
        btn.setAttribute("disabled", true);
    }
}
document.querySelector(".js-clear-btn").addEventListener("click", clearCart);

function clearCart() {
    let infoTxt = document.querySelector(".empty-cart");
    let btn = document.querySelector(".js-btn-buy");
    removeItems(btn, infoTxt);
}

// document.querySelector(".js-remove-item").addEventListener("click", deleteItems);
function deleteItems() {
    this.parentNode.parentNode.remove();
    // checkLength();
}

// function checkLength() {
//     let wrap = document.querySelectorAll(".wrap-product-item");
//     let allBtn = document.querySelectorAll("BUTTON");
//     for (let i = 0; i < wrap.length; i++) {
//         console.log(wrap[i]);
//         for(let y = 0; y < allBtn.length; i++){
//             if(wrap[i].length == 0) {
//                 console.log(true);
//                 allBtn[y].setAttribute("disabled", true)
//             }
//         }
//     }
// }
// checkLength();
(function () {
    let links = document.querySelectorAll(".js-remove-item");

    for (let i = 0; i < links.length; i++) {
        let linksRemove = links[i];
        linksRemove.addEventListener("click", deleteItems)
    }
})();

// Fetch bookmarks
// function fetchProducts() {
//     // Get  from localStorage
//     let products = JSON.parse(localStorage.getItem('products'));
//     console.log(products);
//     let productsResults = document.querySelector('.product-from-bag');
//
//     // Build output
//     productsResults.innerHTML = '';
//     for (let i = 0; i < products.length; i++) {
//         let name = products[i].name;
//         let color = products[i].color;
//         productsResults.innerHTML += '<div class="">'+
//             '<h3>' + name + '</h3>' + '<p>' + color + '</p>' +
//             '</div>';
//     }
// }


// document.querySelector(".js-btn-buy").addEventListener("click", buyProducts);
//
function buyProducts() {
    let infoTxt = document.querySelector(".success-buy");
    let btn = document.querySelector(".js-clear-btn");
    removeItems(btn, infoTxt);
    let modal = document.querySelector(".js-modal");
    modal.classList.remove("showModal");
}

document.querySelector(".js-btn-buy").addEventListener("click", showModal);
    function showModal(){
        let modal = document.querySelector(".js-modal");
        modal.classList.toggle("showModal");
    }

document.querySelector(".js-yes").addEventListener("click", buyProducts);

document.querySelector(".js-no").addEventListener("click", closeModal);

    function closeModal(){
        let modal = document.querySelector(".js-modal");
        modal.classList.remove("showModal");
    }
