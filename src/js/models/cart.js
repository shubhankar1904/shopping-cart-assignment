export default class cart{
    
    constructor(cartViewObj){
        this.cartItems={};
        this.cartViewObj = cartViewObj;
    }

    addItem(id){
        this.cartItems[id] = (this.cartItems[id])?  this.cartItems[id] + 1 : 1;   
        this.cartViewObj.renderCartItems(this);
    }

    

    deleteItem(id){
        this.cartItems[id] = this.cartItems[id] - 1;
        if   (this.cartItems[id] ==0){
            delete this.cartItems[id];
        }
        this.cartViewObj.renderCartItems(this);
    }

}