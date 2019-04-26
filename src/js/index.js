import "../styles/global";
import plpView from "./views/plpView";
import cart from "./models/cart";
import cartView from "./views/cartView";
var bannerTemplate = require("./templates/banners.hbs");
var categoriesBannerTemplate = require("./templates/categoriesBanner.hbs");
var headerTemplate = require("./templates/header.hbs");
var footerTemplate = require("./templates/footer.hbs");

document.body.insertAdjacentHTML("afterbegin", headerTemplate());
document.body.insertAdjacentHTML("beforeend", footerTemplate());

var cartViewObj = new cartView();
var cartObj = new cart(cartViewObj);

var controller = (function() {
  const plpPage = new plpView();

  function initCart() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("cart");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      console.log("clicked");
      modal.style.display = "block";

      var modalHeight = document.querySelector(".modal-content").clientHeight;
      var modalHeader = document.querySelector(".cart-header").clientHeight;
      var modalFooter = document.querySelector(".checkout-container")
        .clientHeight;
      var height = modalHeight - modalHeader - modalFooter;
      document.querySelector(".items-container").style.maxHeight =
        height + "px";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    document.querySelector(".checkout-button").onclick = function() {
      modal.style.display = "none";
    };
  }

  function setBuyBtnEventListner() {
    var btns = document.querySelectorAll(".bn-btn, .sm-bn-btn, .xsm-bn-btn");

    btns.forEach(btn => {
      btn.onclick = function() {
        cartObj.addItem(
          btn.parentElement.parentElement.id ||
            btn.parentElement.parentElement.parentElement.id
        );
      };
    });
  }

  function setCategoryListeners() {
    var categories = document.querySelectorAll(".category");
    categories.forEach(category => {
      category.onclick = function(event) {
        var categoryId = event.target.id.split("-")[0];
        plpPage.RenderFilteredItems(categoryId);
        setBuyBtnEventListner();
      };
    });
  }

  function loadBanners() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "api/banners/index.get.json", false); // false for synchronous request
    xmlHttp.send(null);

    var bannersJSON = JSON.parse(xmlHttp.responseText);
    var bannersJSON = bannersJSON.sort(function(a, b) {
      return a.order - b.order;
    });
    var data = '{ "banners":' + JSON.stringify(bannersJSON) + "}";
    bannersJSON = JSON.parse(data);
    var container = document.querySelector(".section-carousel");
    container.innerHTML = bannerTemplate(bannersJSON);
    container.getElementsByTagName("li")[0].classList.add("active");
    container
      .querySelector(".carousel-inner")
      .firstElementChild.classList.add("active");
    //class="active"

    // load categories

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "api/categories/index.get.json", false); // false for synchronous request
    xmlHttp.send(null);

    var categoriesJSON = JSON.parse(xmlHttp.responseText);
    categoriesJSON.forEach(function(el) {
      el.direction = 1;
    });
    var categoriesJSON = categoriesJSON.sort(function(a, b) {
      return a.order - b.order;
    });
    var data = '{ "categories":' + JSON.stringify(categoriesJSON) + "}";
    categoriesJSON = JSON.parse(data);
    var container = document.getElementById("categories-banners");
    container.innerHTML = categoriesBannerTemplate(categoriesJSON);
  }

  return {
    init: function() {
      initCart();
      document.querySelector(".icon").onclick = function() {
        console.log("hello");
        var x = document.querySelector(".main-nav");
        if (x.className === "main-nav") {
          x.className += " responsive";
        } else {
          x.className = "main-nav";
        }
      };
    },
    loadBanners: function() {
      loadBanners();
    },

    loadPlp: function() {
      console.log("loading products");

      plpPage.RenderProducts();
      setBuyBtnEventListner();
      setCategoryListeners();
    }
  };
})();

controller.init();

try {
  controller.loadBanners();
} catch (err) {}
try {
  controller.loadPlp();
} catch (err) {}
