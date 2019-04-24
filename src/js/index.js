import styles from '../styles/app.module'
import '../styles/global'
import plpView from './views/plpView'
import cart from './models/cart'
import cartView from './views/cartView'
var bannerTemplate = require("./templates/banners.hbs");
var categoriesBannerTemplate = require("./templates/categoriesBanner.hbs");

var cartViewObj = new cartView();
var cartObj = new cart(cartViewObj);

var controller = (function() {
  
      const plpPage = new plpView();


      function initCart(){
        console.log("Controller initialised"); 
          
      }

      function setBuyBtnEventListner(){
        var btns = document.querySelectorAll(".bn-btn, .sm-bn-btn, .xsm-bn-btn");
        
        btns.forEach(btn => {
            btn.onclick = function(){
            cartObj.addItem(btn.parentElement.parentElement.id || btn.parentElement.parentElement.parentElement.id);
            
            
          }
        });
      }

      function setCategoryListeners(){
        var categories = document.querySelectorAll(".category");
        categories.forEach(category => {
          category.onclick = function(event){
            var categoryId= event.target.id || (event.target.id).split("-")[1];
            plpPage.RenderFilteredItems(categoryId);
            setBuyBtnEventListner();
        }
      });

      }

      function loadBanners(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "api/banners/index.get.json", false ); // false for synchronous request
        xmlHttp.send( null );
        
        var bannersJSON = JSON.parse(xmlHttp.responseText);
        var bannersJSON = bannersJSON.sort(function(a, b) {return a.order - b.order});
        var data = "{ \"banners\":"+JSON.stringify(bannersJSON)+"}";
        //console.log(data);
        bannersJSON = JSON.parse(data);
        var container = document.querySelector('.carousel-inner');
        container.innerHTML = bannerTemplate(bannersJSON);
        container.firstElementChild.classList.add("active");

        // load categories

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "api/categories/index.get.json", false ); // false for synchronous request
        xmlHttp.send( null );
        
        var categoriesJSON = JSON.parse(xmlHttp.responseText);
        categoriesJSON.forEach(function(el){el.direction=1});
        var categoriesJSON = categoriesJSON.sort(function(a, b) {return a.order - b.order});
        var data = "{ \"categories\":"+JSON.stringify(categoriesJSON)+"}";
        //console.log(data);
        categoriesJSON = JSON.parse(data);
        var container = document.getElementById('categories-banners');
        container.innerHTML = categoriesBannerTemplate(categoriesJSON);
        


      }

  return {
    init : function(){
      initCart();  
    },
    loadBanners: function(){
      loadBanners();
    },

    loadPlp : function(){
      console.log("loading products");
      
      plpPage.RenderProducts();
      setBuyBtnEventListner();
      setCategoryListeners();  

    }
  }
})();

controller.init();

try{
  controller.loadBanners();
}catch(err){
}
try{
  controller.loadPlp();
}catch(err){
}



 // Get the modal
      var modal = document.getElementById('myModal');

      // Get the button that opens the modal
      var btn = document.getElementById("cart");
      
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      
      // When the user clicks on the button, open the modal 
      btn.onclick = function() {
        console.log("clicked");
        modal.style.display = "block";
      }
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      