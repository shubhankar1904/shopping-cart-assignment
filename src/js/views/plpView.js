var productsTemplate = require("../templates/products.hbs");

export default class plpView {
  constructor() {}

  RenderProducts() {
    fetch("api/products/index.get.json")
      .then(response => response.json())
      .then(data => {
        var data = '{ "products":' + JSON.stringify(data) + "}";
        var productsJSON = JSON.parse(data);
        this.RenderItems(productsJSON);
      });
  }

  RenderFilteredItems(categoryId) {
    fetch("api/products/index.get.json")
      .then(response => response.json())
      .then(data => {
        data = data.filter(function(el) {
          return el.category == categoryId;
        });
        var data = '{ "products":' + JSON.stringify(data) + "}";
        var productsJSON = JSON.parse(data);
        var plpContainer = document.querySelector(".plp-container");

        while (plpContainer.firstChild) {
          plpContainer.removeChild(plpContainer.firstChild);
        }
        this.RenderItems(productsJSON);
      });
  }

  RenderItems(productsJSON) {
    var container = document.querySelector(".plp-container");
    container.innerHTML = productsTemplate(productsJSON);
  }
}
