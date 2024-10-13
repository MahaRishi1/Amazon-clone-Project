import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getmatchingProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
const matchingProduct = getmatchingProduct(productId);

function cart_quantity(){
  let cartquantity = 0;

  cart.forEach(cartitem => {
    cartquantity += cartitem.quantity;
  });
  let cartQuantity = document.querySelector(".cart-quantity")
  cartQuantity.textContent = cartquantity
}
cart_quantity();

function renderTrackingPage(){

  document.querySelector(".main")
      .innerHTML = `
      <div class="order-tracking">
          <a class="back-to-orders-link link-primary" href="orders.html">
            View Orders
          </a>
  
          <div class="delivery-date">
            Arriving on ${dateString()}
          </div>
  
          <div class="product-info">
            ${matchingProduct.name}
          </div>
  
          <div class="product-info">
            Quantity: ${getQuantity()}
          </div>
  
          <img class="product-image" src="${matchingProduct.image}">
  
          <div class="progress-labels-container">
            <div class="progress-label1">
              Preparing
            </div>
            <div class="progress-label2">
              Shipped
            </div>
            <div class="progress-label3">
              Delivered
            </div>
          </div>
  
          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        </div>
      `

}
renderTrackingPage();


function getQuantity(){

    let quantity;
    orders.forEach(orderItem => {
        const products = orderItem.products;
        products.forEach(product => {
            if(product.productId === productId){
                quantity = product.quantity;
            }
        });
    });
    return quantity;
}


function dateString(){
  const arrivingDate = JSON.parse(localStorage.getItem('arrivingDate'))
    let datestring = '';
    let arrivingProgressDate = '';
    let orderedDate = '';
    arrivingDate.forEach(arrivingDateItem => {
        
        if(arrivingDateItem.orderId === orderId){
          if(arrivingDateItem.productId === productId){
              datestring = arrivingDateItem.dateString;
              orderedDate = Number(arrivingDateItem.orderDate)

          }
        }
    });
    arrivingProgressDate = dayjs(datestring);
    arrivingProgressDate = Number(arrivingProgressDate.format('DD'));

    // orderedDate = dayjs(orderedDate);
    // orderedDate = Number(orderedDate.format('DD'));

          
          
    let todayDate = dayjs();
    todayDate = Number(todayDate.format('DD'))

    
    document.addEventListener("DOMContentLoaded", ()=>{
      const progressBar = document.querySelector(".progress-bar")
      if(arrivingProgressDate === todayDate){
        progressBar.style.animation = "delivered 3s ease-in-out 0.5s 1 forwards";
        document.querySelector(".progress-label3").classList.add("current-status")
      }else if(orderedDate === todayDate){
        progressBar.style.animation = 'preparing 2s ease-in-out 0.5s 1 forwards';
        document.querySelector(".progress-label1").classList.add("current-status")
      }else{
        progressBar.style.animation = 'shipped 3s ease-in-out 0.5s 1 forwards';
        document.querySelector(".progress-label2").classList.add("current-status")
      }
    })

    return datestring;
}


