import { cart } from "../data/cart.js";
import { getdeliverydetails } from "../data/deliveryoptions.js";
import { orders } from "../data/orders.js";
import { getmatchingProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



function cart_quantity(){
  let cartquantity = 0;

  cart.forEach(cartitem => {
    cartquantity += cartitem.quantity;
  });
  let cartQuantity = document.querySelector(".cart-quantity")
  cartQuantity.textContent = cartquantity
}
cart_quantity();

let i = (orders.length) - 1;
let arrivingDate = JSON.parse(localStorage.getItem(('arrivingDate'))) ;
if(!arrivingDate){
  arrivingDate = [];
}


function renderOrderHtml(){
  if(orders.length === 0){
    const html = `
      <button class="view-product">View Cart</button>
    `
    document.querySelector(".orders-grid").innerHTML = html;

    document.querySelector(".orders-grid").addEventListener("click", ()=>{
      window.location.href = "checkout.html"
    })
  }
  let orderHTML ='';
  let k = (orders.length) - 1;;

    orders.forEach(orderItem => {
    let date = orderItem.orderTime;
    date = dayjs(date);
    const dateofString = date.format('dddd, MMMM D');
    let product = orderItem.products;
    let totAmtBeforeTax = 0;
    let taxAmt = 0;
    let totAmount = 0;
    let totcostorders = 0;
    let tax = 0;
    let preamount = 0;
    let shippingAmount = JSON.parse(localStorage.getItem('shippingAmtArray'));
  
    cart.forEach(cartitem => {
      // const deliveryoption = getdeliverydetails(cartitem.deliveryoptionId);
      // shippingAmount += deliveryoption.amount;
    });
    totcostorders = orderItem.totalCostCents;
    preamount = (Number(totcostorders) * 0.1).toFixed(2) ;

    taxAmt = (Number(shippingAmount[i]) * 0.1).toFixed(2);


    tax = Number(totcostorders) - Number(preamount);
    totAmtBeforeTax = (Number(totcostorders) + Number(shippingAmount[i]));
    totAmount = Math.round(Number(totAmtBeforeTax) + Number(taxAmt));

    orderHTML += `
    <div class="order-container">
    
    <div class="order-header">
    <div class="order-header-left-section">
    <div class="order-date">
    <div class="order-header-label">Order Placed:</div>
    <div>${dateofString}</div>
    </div>
    <div class="order-total">
    <div class="order-header-label">Total:</div>
    <div>₹${totAmount}</div>
    </div>
    </div>
    
    <div class="order-header-right-section">
    <div class="order-header-label">Order ID:</div>
    <div>${orderItem.id}</div>
    </div>
    </div>
    ${renderOrderGrid(product,k,date,orderItem.id,dateofString)}
        </div>
    `
    i=i-1;
    k-=1;
  });

  document.querySelector(".orders-grid")
  .innerHTML += orderHTML;
}


function renderOrderGrid(product,k,date,orderId,dateofString){
  let productId = '';
  let matchingProduct = '';
  let orderGridHTML = '';

  let j = 0;


  product.forEach(products => {
    productId = products.productId;
    
    matchingProduct = getmatchingProduct(productId);
    orderGridHTML += `
    <div class="order-details-grid">
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${deliverydate(j,k,date,orderId,products.productId,dateofString)}
        </div>
        <div class="product-quantity">
          Quantity: ${products.quantity}
        </div>
        <button class="js-buy-again-btn buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        ${trackingdata(orderId,products.productId)}
        </a>
      </div>
    </div>
    `
    j = j + 1;
  });
  
  
  return orderGridHTML;
  
}
renderOrderHtml();



document.querySelectorAll(".js-buy-again-btn").forEach((button) =>{
  button.addEventListener("click", ()=>{
    window.location.href = 'checkout.html';
  });
});

function deliverydate(j,k,date,order_Id,product_Id,dateofString){
  const cartOrdered = JSON.parse(localStorage.getItem('cartOrdered'));
  const deliveryoptionid = cartOrdered[k][j].deliveryoptionId;
  const deliveryDetails = getdeliverydetails(deliveryoptionid);
  let orderedDate = date.format('D');
  date = date.add(deliveryDetails.deliveryDays,'days');
  const dateString = date.format('dddd, MMMM D');

  
  // orderedDate = dayjs(orderedDate);
  // orderedDate = orderedDate.format('dddd, MMMM D');

  arrivingDate.push({
    orderId : order_Id,
    productId : product_Id,
    dateString : dateString,
    orderDate : orderedDate
  })
  localStorage.setItem('arrivingDate',JSON.stringify(arrivingDate));
  return dateString;
}

function trackingdata(orderId,productId){
  let html = '';

  html = `
    <a href="tracking.html?orderId=${orderId}&&productId=${productId}">
      <button class="track-package-button button-secondary">
        Track package
      </button>
    </a>
  `
  return html;
}

