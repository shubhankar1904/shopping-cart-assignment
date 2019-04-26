var productsTemplate = require("../templates/products.hbs");

export default class plpView {
  constructor() {}

  RenderProducts() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "api/products/index.get.json", false); // false for synchronous request
    xmlHttp.send(null);
    var data = '{ "products":' + xmlHttp.responseText + "}";
    var productsJSON = JSON.parse(data);
    this.RenderItems(productsJSON);
  }

  RenderFilteredItems(categoryId) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "api/products/index.get.json", false); // false for synchronous request
    xmlHttp.send(null);

    var productsJSON = JSON.parse(xmlHttp.responseText);
    var productsJSON = productsJSON.filter(function(el) {
      return el.category == categoryId;
    });
    var data = '{ "products":' + JSON.stringify(productsJSON) + "}";
    var productsJSON = JSON.parse(data);
    var plpContainer = document.querySelector(".plp-container");

    while (plpContainer.firstChild) {
      plpContainer.removeChild(plpContainer.firstChild);
    }

    this.RenderItems(productsJSON);
  }

  RenderItems(productsJSON) {
    console.log("here");
    console.log(productsJSON);
    var container = document.querySelector(".plp-container");
    container.innerHTML = productsTemplate(productsJSON);
  }
}
