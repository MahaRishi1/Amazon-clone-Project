import {cart, removeproduct, updatedeliveryoption} from '../../data/cart.js';
import {products, getmatchingProduct} from '../../data/products.js';
import {deliveryoption, getdeliverydetails} from '../../data/deliveryoptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderpayementdetails } from './paymentsummary.js';

console.log(cart)
export function renderOrderSummary(){

  if(cart.length === 0){
    const html = `
      <a href="amazon.html"><button class="view-product">View Products</button></a>
    `
    document.querySelector(".page-title").textContent = 'No Products in your Cart!'
    document.querySelector(".page-title").innerHTML += `<p style="font-size:15px; margin-top:10px; font-weight: 100;">
    Add some Products to Your Cart  </p>`
    document.querySelector(".checkout-grid").innerHTML = html;

  }else{

    let cartsummaryHTML = "";
    
    
    cart.forEach(cartitem => {
    
      const productId = cartitem.productId;
      const matchingProduct =  getmatchingProduct(productId);
  
  
      const deliveryoptionId = cartitem.deliveryoptionId;
      
      const deliveryOpt = getdeliverydetails(deliveryoptionId);
  
      const todayDate = dayjs();
      const deliveryDate = todayDate.add(deliveryOpt.deliveryDays,'days')
      const dateString = deliveryDate.format('dddd, MMMM D')
  
      cartsummaryHTML +=
      `
          <div class="cart-item-container js-cart-container-${productId}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ₹${matchingProduct.amount}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                    </span>
                    <span class="delete-quantity-link link-primary"
                    data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryoptionHtml(matchingProduct,cartitem)}
                </div>
              </div>
            </div>
      `    
    });
      
    document.querySelector(".order-summary")
      .innerHTML = cartsummaryHTML;
  
    document.querySelectorAll(".delete-quantity-link")
        .forEach(link => {
            link.addEventListener("click", () => {
    
                const productId = link.dataset.productId;
                removeproduct(productId);
    
                const container = document.querySelector(`.js-cart-container-${productId}`)
                container.remove();
                renderpayementdetails();
                renderOrderSummary();
            })
        });
    
    function deliveryoptionHtml(matchingProduct,cartitem){
      let html = ''
      
      deliveryoption.forEach(deliveryopt => {
        const todayDate = dayjs();
        const deliveryDate = todayDate.add(deliveryopt.deliveryDays,'days')
        const dateString = deliveryDate.format('dddd, MMMM D')
    
        const amountstring = deliveryopt.amount === 0
        ? "FREE" 
        : `+ ₹${deliveryopt.amount}`;
    
        const ischecked = deliveryopt.id === cartitem.deliveryoptionId;
    
        html += `
          <div class="delivery-option js-delivery-option"
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryopt.id}"
          >
            <input type="radio" 
            ${ischecked?'checked':''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${amountstring} Shipping
              </div>
            </div>
          </div>
        `
    
    
      });
      return html;
    }
    
    document.querySelectorAll(".js-delivery-option")
      .forEach(element => {
        element.addEventListener("click", ()=> {
          const {productId, deliveryOptionId} = element.dataset;
          updatedeliveryoption(productId, deliveryOptionId);
          renderOrderSummary();
          renderpayementdetails();
        })
      });  
  }
}

renderOrderSummary();