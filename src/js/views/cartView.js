export default class cartView {
  constructor() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "api/products/index.get.json", false); // false for synchronous request
    xmlHttp.send(null);
    this.productsJSON = JSON.parse(xmlHttp.responseText);
  }

  setEditQtyBtnListeners(cart) {
    var tmp = document.querySelectorAll(".cart-edit-btn.plus");
    for (var i = 0, element; (element = tmp[i]); i++) {
      element.onclick = function(event) {
        var id = (event.target.id || event.target.parentElement.id).toString();
        id = id.split("_")[0];
        cart.addItem(id);
      };
    }

    tmp = document.querySelectorAll(".cart-edit-btn.min");
    for (var i = 0, element; (element = tmp[i]); i++) {
      element.onclick = function(event) {
        var id = (event.target.id || event.target.parentElement.id).toString();
        id = id.split("_")[0];
        cart.deleteItem(id);
      };
    }
  }

  renderCartItems(cart) {
    var itemsContainer = document.querySelector(".items-container");

    while (itemsContainer.firstChild) {
      itemsContainer.removeChild(itemsContainer.firstChild);
    }
    var totalItems = 0;
    for (var item in cart.cartItems) {
      totalItems += cart.cartItems[item];
    }
    document.querySelector(".cart-header").firstElementChild.innerHTML =
      "My Cart: ( " + totalItems + " ) Items";
    document.querySelector(
      ".cart-icon-container"
    ).firstElementChild.lastElementChild.innerHTML = +totalItems + " Items";

    for (var item in cart.cartItems) {
      var div = document.createElement("div");
      div.className = "item";

      var productDetails = this.productsJSON.filter(function(el) {
        return el.id == item;
      })[0];

      var totalCost = productDetails.price * cart.cartItems[item];

      var html = ` 
        <div class="item-image">
          <img src="${productDetails.imageURL}">
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

      div.innerHTML = html;

      document
        .querySelector(".items-container")
        .insertAdjacentElement("beforeend", div);
    }
    this.setEditQtyBtnListeners(cart);
  }
}
