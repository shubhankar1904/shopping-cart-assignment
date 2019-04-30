export default class cart {
  constructor(cartViewObj) {
    if (sessionStorage.cart === undefined) {
      this.cartItems = {};
      sessionStorage.cart = JSON.stringify(this.cartItems);
    } else {
      this.cartItems = JSON.parse(sessionStorage.cart);
    }
    this.cartViewObj = cartViewObj;
    this.cartViewObj.renderCartItems(this);
  }

  addItem(id) {
    this.cartItems[id] = this.cartItems[id] ? this.cartItems[id] + 1 : 1;
    sessionStorage.cart = JSON.stringify(this.cartItems);
    this.cartViewObj.renderCartItems(this);
  }

  deleteItem(id) {
    this.cartItems[id] = this.cartItems[id] - 1;
    if (this.cartItems[id] == 0) {
      delete this.cartItems[id];
      sessionStorage.cart = JSON.stringify(this.cartItems);
    }
    this.cartViewObj.renderCartItems(this);
  }
}
