export default class cart {
  constructor(cartViewObj) {
    if (sessionStorage.cart === undefined) {
      this.cartItems = {};
      sessionStorage.cart = JSON.stringify(this.cartItems);
    } else {
      this.cartItems = JSON.parse(sessionStorage.cart);
    }
  }

  addItem(id) {
    this.cartItems[id] = this.cartItems[id] ? this.cartItems[id] + 1 : 1;
    sessionStorage.cart = JSON.stringify(this.cartItems);
  }

  deleteItem(id) {
    this.cartItems[id] = this.cartItems[id] - 1;
    if (this.cartItems[id] == 0) {
      delete this.cartItems[id];
      sessionStorage.cart = JSON.stringify(this.cartItems);
    }
  }
}
