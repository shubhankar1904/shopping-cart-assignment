import "../styles/global";
import plpView from "./views/plpView";
import cart from "./models/cart";
import cartView from "./views/cartView";
import "./vendor/carousel";

var bannerTemplate = require("./templates/banners.hbs");
var categoriesBannerTemplate = require("./templates/categoriesBanner.hbs");
var headerTemplate = require("./templates/header.hbs");
var footerTemplate = require("./templates/footer.hbs");

document.body.insertAdjacentHTML("afterbegin", headerTemplate());
document.body.insertAdjacentHTML("beforeend", footerTemplate());

const cartViewObj = new cartView();
const cartObj = new cart(cartViewObj);
const plpPage = new plpView();

var controller = (function() {
  function loadBanners() {
    //load carousel
    fetch("api/banners/index.get.json")
      .then(response => response.json())
      .then(data => {
        var bannersJSON = data.sort(function(a, b) {
          return a.order - b.order;
        });
        var bannersJSONStr = '{ "banners":' + JSON.stringify(bannersJSON) + "}";
        bannersJSON = JSON.parse(bannersJSONStr);
        var container = document.querySelector(".section-carousel");
        container.innerHTML = bannerTemplate(bannersJSON);
        container.getElementsByTagName("li")[0].classList.add("active");
        container
          .querySelector(".carousel-inner")
          .firstElementChild.classList.add("active");
      });

    // load categories banners
    fetch("api/categories/index.get.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(function(el) {
          el.direction = 1;
        });

        var categoriesJSON = data.sort(function(a, b) {
          return a.order - b.order;
        });
        var categoriesJSONStr =
          '{ "categories":' + JSON.stringify(categoriesJSON) + "}";
        categoriesJSON = JSON.parse(categoriesJSONStr);
        var container = document.getElementById("categories-banners");
        container.innerHTML = categoriesBannerTemplate(categoriesJSON);
      });
  }

  function initiateEventHandlers() {
    document.onclick = function(event) {
      if (
        event.target.classList.value == "bn-btn" ||
        event.target.classList.value == "sm-bn-btn" ||
        event.target.classList.value == "xsm-bn-btn"
      ) {
        cartObj.addItem(
          event.target.parentNode.parentNode.parentNode.id ||
            event.target.parentNode.parentNode.id
        );
      }

      if (
        event.target.classList.value == "category" ||
        event.target.parentNode.classList.value === "category"
      ) {
        var categoryId =
          event.target.id.split("-")[0] ||
          event.target.parentNode.id.split("-")[0];
        if (categoryId == "all") {
          plpPage.RenderProducts();
        } else {
          plpPage.RenderFilteredItems(categoryId);
        }
      }

      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      try {
        if (
          event.target.closest("li").classList.value == "cart-icon-container"
        ) {
          modal.style.display = "block";

          var modalHeight = document.querySelector(".modal-content")
            .clientHeight;
          var modalHeader = document.querySelector(".cart-header").clientHeight;
          var modalFooter = document.querySelector(".checkout-container")
            .clientHeight;

          var height = modalHeight - modalHeader - modalFooter;

          document.querySelector(".items-container").style.height =
            height + "px";
        }
      } catch {}

      // Get the <span> element that closes the modal
      if (event.target.classList.value == "close") {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      if (event.target == modal) {
        modal.style.display = "none";
      }

      if (event.target.classList.value == "checkout-button") {
        modal.style.display = "none";
        sessionStorage.removeItem("cart");
        window.location.href = "../../index.html";
      }

      if (event.target.parentNode.classList.value == "icon") {
        var x = document.querySelector(".main-nav");
        if (x.className === "main-nav") {
          x.className += " responsive";
        } else {
          x.className = "main-nav";
        }
      }

      var opr = (event.target.id || event.target.parentElement.id)
        .toString()
        .split("_")[1];

      if (opr == "plus") {
        var id = (event.target.id || event.target.parentElement.id).toString();
        id = id.split("_")[0];
        cartObj.addItem(id);
      } else if (opr == "min") {
        var id = (event.target.id || event.target.parentElement.id).toString();
        id = id.split("_")[0];
        cartObj.deleteItem(id);
      }
    };
  }

  return {
    init: function() {
      initiateEventHandlers();
    },
    loadBanners: function() {
      loadBanners();
    },

    loadPlp: function() {
      var url = new URL(document.URL);
      if (url.searchParams.get("id")) {
        plpPage.RenderFilteredItems(url.searchParams.get("id"));
      } else {
        plpPage.RenderProducts();
      }
    }
  };
})();

window.onload = function() {
  controller.init();

  if (document.URL.toString().match("index")) {
    controller.loadBanners();
  }
  if (document.URL.toString().match("plp")) {
    controller.loadPlp();
  }
};
