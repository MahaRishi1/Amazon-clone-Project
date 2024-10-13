export let cart;

loadtoStorage();
export function loadtoStorage(){
  cart = JSON.parse(localStorage.getItem("cart"))
  if(!cart){
      cart = [
          {
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity : 2,
              deliveryoptionId: '1'
          },
          {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity : 1,
              deliveryoptionId: '2'
          }
          ];
      
  }

}


function savetostorage(){
    localStorage.setItem("cart",JSON.stringify(cart));
}


export function addtocart(productid){

    let matchingitem;
  
    cart.forEach(cartitem => {
      if(productid === cartitem.productId){
        matchingitem = cartitem
      }
    });
  
    if(matchingitem){
      matchingitem.quantity += 1;
    }else{
      cart.push({
        productId: productid,
        quantity: 1,
        deliveryoptionId: '1'
      })
    }
    savetostorage();
}

export function removeproduct(productid){
    const newcart = [];


    cart.forEach(cartitem => {
        if(cartitem.productId !== productid){
            newcart.push(cartitem)
        } 
    });
    cart = newcart;
    savetostorage();
}


export function updatedeliveryoption(productid, deliveryoptionId){
  let matchingitem;

  cart.forEach(cartitem => {
    if(productid === cartitem.productId){
      matchingitem = cartitem
    }
  });
  matchingitem.deliveryoptionId = deliveryoptionId;
  savetostorage();
}