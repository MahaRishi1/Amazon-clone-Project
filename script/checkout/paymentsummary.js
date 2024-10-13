import {cart} from "../../data/cart.js";
import { getdeliverydetails } from "../../data/deliveryoptions.js";
import {getmatchingProduct} from "../../data/products.js";
import {addOrder, orders} from "../../data/orders.js";

let cartOrdered = JSON.parse(localStorage.getItem('cartOrdered'))||[];

export function renderpayementdetails(){
  let html = '';
  let productTotAmount = 0;
  let shippingAmount = 0;
  let shippingAmtArray = JSON.parse(localStorage.getItem('shippingAmtArray')) || [];
  if(cart.length !== 0){

    cart.forEach(cartitem => {
      const matchingProduct = getmatchingProduct(cartitem.productId);
      productTotAmount +=  matchingProduct.amount * cartitem.quantity;
      
      const deliveryoption = getdeliverydetails(cartitem.deliveryoptionId);
      shippingAmount += deliveryoption.amount;
    });
    
    let totAmtBeforeTax = 0;
    let taxAmt = 0;
    let totAmount = 0;
    totAmtBeforeTax = Number(productTotAmount + shippingAmount);
    taxAmt= (Number(totAmtBeforeTax) * 0.1).toFixed(2);
    totAmount = Math.round(Number(totAmtBeforeTax) + Number(taxAmt)).toFixed(2);
  
    
    html += 
    `
    <div class="payment-summary-title">Order Summary</div>
    
    <div class="payment-summary-row">
    <div>Items (${cartItemsCount()}):</div>
    <div class="payment-summary-money">₹${productTotAmount}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">₹${shippingAmount}</div>
              </div>
              
            <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totAmtBeforeTax}</div>
            </div>
            
            <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">₹${taxAmt}</div>
              </div>
  
            <div class="payment-summary-row total-row">
            <div>Order total:</div>
              <div class="payment-summary-money">₹${totAmount}</div>
              </div>
              
              <button class="place-order-button button-primary">
              Place your order
              </button>
              `
              
              document.querySelector(".payment-summary")
              .innerHTML = html;
              
              document.querySelector(".place-order-button")
              .addEventListener("click", async () =>{
          try {
            
            const response = await fetch('https://supersimplebackend.dev/orders', {
              method : 'POST',
              headers: {
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({
                cart : cart
              })
            })
            const order = await response.json();
            addOrder(order);
          } catch (error) {
            console.log("Unexpected Error Occured, Try again Later")
          }
          
          shippingAmtArray.push(shippingAmount);
          localStorage.setItem('shippingAmtArray',JSON.stringify(shippingAmtArray));
          
          window.location.href = 'orders.html';
          
          cartOrdered.push(cart);
  
          localStorage.setItem('cartOrdered',JSON.stringify(cartOrdered));
          
  
        });
  
        function cartItemsCount(){
          let count=0;
          cart.forEach(cartItem => {
            count += cartItem.quantity;
          });
          return count;
        }

  }
}