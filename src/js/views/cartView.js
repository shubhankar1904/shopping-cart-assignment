export default class cartView {
  constructor() {}

  clearContents() {
    var itemsContainer = document.querySelector(".items-container");

    while (itemsContainer.firstChild) {
      itemsContainer.removeChild(itemsContainer.firstChild);
    }
  }
  calculateTotalItems(cart) {
    var totalItems = 0;
    for (var item in cart.cartItems) {
      totalItems += cart.cartItems[item];
    }
    return totalItems;
  }

  renderItemCount(totalItems) {
    document.querySelector(".cart-header").firstElementChild.innerHTML =
      "My Cart: ( " + totalItems + " ) Items";
    document.querySelector(
      ".cart-icon-container"
    ).firstElementChild.lastElementChild.innerHTML = +totalItems + " Items";
  }

  insertOfferBanner() {
    var div = document.createElement("div");
    div.innerHTML = `<div class="offer-banner">
      <img src="../../../static/images/lowest-price.png"/>
      <span><p>You wont find it cheaper anywhere</p></span>
    </div>`;
    document
      .querySelector(".items-container")
      .insertAdjacentElement("beforeend", div);
  }

  renderEmmptyCartView() {
    var html = ` <h4 class="empty-cart-header">No Items in the cart</h4>
    <p class="empty-cart-sub-header">Your favorite items are just a click away</p>`;

    document.querySelector(".items-container").innerHTML = html;
    document.querySelector(".promo-banner").classList.add("hide");

    document
      .querySelector(".items-container")
      .classList.add("items-container-bg");

    document.querySelector(".checkout-button").innerHTML = "Start Shopping";
  }

  initiateNonEmptyCart() {
    document.querySelector(".promo-banner").classList.remove("hide");

    document
      .querySelector(".items-container")
      .classList.remove("items-container-bg");
  }

  getItemHTML(cart, productDetails, item, totalCost) {
    var html = ` 
    <div class="item-image">
      <picture>
          <source media="(min-width: 1024px)" srcset="../../../${
            productDetails.imageURL
          }/100.jpg">
          <source media="(min-width: 768px)" srcset="../../../${
            productDetails.imageURL
          }/100.jpg">
          <source media="(min-width: 600px)" srcset="../../../${
            productDetails.imageURL
          }/300.jpg">
          <img src="../../../${productDetails.imageURL}/100.jpg" alt="Item">
      </picture>
  </div>
    <div class="item-details">
      <div class="item-name">
          ${productDetails.name}
      </div>
      <div class="item-qty-price">
        <div class="cart-edit-btn min">

        <svg version="1.1" id="${item}_min" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 476.737 476.737" style="enable-background:new 0 0 476.737 476.737;" xml:space="preserve">

  <path d="M238.369,0C106.726,0,0,106.726,0,238.369c0,131.675,106.726,238.369,238.369,238.369
    c131.675,0,238.369-106.694,238.369-238.369C476.737,106.726,370.043,0,238.369,0z M365.499,254.26h-254.26
    c-8.772,0-15.891-7.151-15.891-15.891c0-8.772,7.119-15.891,15.891-15.891h254.26c8.74,0,15.891,7.119,15.891,15.891
    C381.39,247.109,374.239,254.26,365.499,254.26z"/>

        </svg>
         
        </div>
            ${cart.cartItems[item]} 
          <div class="cart-edit-btn plus">
            <svg version="1.1" id="${item}_plus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="510px" height="510px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">

                    <path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M382.5,280.5h-102v102h-51v-102
                      h-102v-51h102v-102h51v102h102V280.5z"/>

                </svg>
          </div>

            x Rs. ${productDetails.price}
            <span>Rs. ${totalCost}</span>
      </div>
      
      
    </div>
    `;
    return html;
  }

  renderCartItems(cart) {
    this.clearContents();

    var totalItems = this.calculateTotalItems(cart);

    this.renderItemCount(totalItems);

    if (totalItems == 0) {
      this.renderEmmptyCartView();
    } else {
      fetch("api/products/index.get.json")
        .then(response => response.json())
        .then(data => {
          this.initiateNonEmptyCart();

          var cartTotal = 0;
          for (var item in cart.cartItems) {
            var div = document.createElement("div");
            div.className = "item";
            var productDetails = data.filter(function(el) {
              return el.id == item;
            })[0];

            var totalCost = productDetails.price * cart.cartItems[item];
            cartTotal += totalCost;

            var html = this.getItemHTML(cart, productDetails, item, totalCost);

            div.innerHTML = html;

            document.querySelector(".checkout-button").innerHTML = `
            <span class="proceed">Proceed to checkout</span><span class="total">Rs. ${cartTotal}</span>`;

            document
              .querySelector(".items-container")
              .insertAdjacentElement("beforeend", div);
          }
          this.insertOfferBanner();
        });
    }
  }
}
