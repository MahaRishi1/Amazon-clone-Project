import {cart,addtocart} from '../data/cart.js';
import {getmatchingProduct, products} from '../data/products.js';



export function renderProductGrid(productsList){

  let producthtml = ""
  
  productsList.forEach((product) => {
      producthtml += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarRating()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ₹${product.amount}
            </div>
  
            <div class="product-quantity-container">
              <select data-product-id="${product.id}" id="quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <!-- ${product.getextraInfoHTML()} -->
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button data-product-id="${product.id}" class="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>
      `
  });
  document.querySelector(".products-grid").innerHTML = producthtml

 
  
  
   function cart_quantity(){
    let cartquantity = 0;
  
    cart.forEach(cartitem => {
      cartquantity += cartitem.quantity;
    });
    let cartQuantity = document.querySelector(".cart-quantity")
    cartQuantity.textContent = cartquantity
  }
  cart_quantity();
  
  document.querySelectorAll(".add-to-cart-button")
    .forEach(button => {
      button.addEventListener("click",()=>{
        const productid = button.dataset.productId

        const quantityDropdown = document.getElementById(`quantity-${productid}`);
        let selectedQuantity; 
        selectedQuantity = Number(quantityDropdown.value);
        for(let i=1;i<=selectedQuantity;i++){
          addtocart(productid)
        }
        cart_quantity();

        button.innerHTML = `<img class="check-mark" src="images/icons/checkmark.png" /> Added`
        button.style.color = "green";

        setTimeout( ()=>{
          button.textContent = "Add to Cart"
          button.style.color = "black";
        }, 2000)
      });
    });
    enterSearch()
    clickSearch()

}

renderProductGrid(products);


export function enterSearch(){
  const input =  document.getElementById("search-bar-input");
  input.addEventListener("keydown", (event)=>{
    if(event.key === 'Enter' && input.value !== ''){
      let inputVal = '';
      let productIdList = [];
        inputVal = input.value.toLowerCase();
        input.value = ''
  
      products.forEach(product => {
        const keyWords = product.keywords;
  
        keyWords.forEach(keywords => {
          const words = product.name.toLowerCase().split(" ");
          words.forEach(word => {
            if(word === inputVal || keywords === inputVal){
                productIdList.push(product.id);
            }
            
          });
        });
      });
      
      if(productIdList.length === 0){
        document.querySelector(".image-container").innerHTML = '';
        document.querySelector(".products-grid").innerHTML = '';
        document.querySelector(".not-found-js").innerHTML = `<h2>No Matching Prodcut found</h2><img class="not-found2" src="images/icons/notfound image2.jpg" alt="not found">`
      }else{
        document.querySelector(".image-container").innerHTML = `<div class="image-container">
            <img class="bg" src="images/perfect thumbnail 4.webp" alt="">
          </div>`;
        document.querySelector(".not-found-js").innerHTML = ''
        productIdList = [...new Set(productIdList)]
        let filteredProduct = []
        productIdList.forEach(productId => {
          filteredProduct.push(getmatchingProduct(productId));
          console.log(filteredProduct);
         });
        renderProductGrid(filteredProduct);
      }
    }
  });

}

export function clickSearch(){
  document.getElementById("search-btn").addEventListener("click",()=>{
  
    const input = document.getElementById("search-bar-input");
    let inputVal = '';
    if(input.value !== ''){
      let productIdList = [];
      inputVal = input.value
      inputVal = inputVal.toLowerCase()
      input.value = ''
      products.forEach(product => {
        const keyWords = product.keywords;
        
        keyWords.forEach(keywords => {
          const words = product.name.toLowerCase().split(" ");
          words.forEach(word => {
            if(word === inputVal || keywords === inputVal){
              productIdList.push(product.id);
            }
            
          });
        });
      });
      console.log(productIdList)
      
      if(productIdList.length === 0){
        document.querySelector(".image-container").innerHTML = '';
        document.querySelector(".products-grid").innerHTML = '';
        document.querySelector(".not-found-js").innerHTML = `<h2>No Matching Prodcut found</h2><img class="not-found" src="images/icons/notfound image.jpg" alt="not found"></img>`;
      }else{
        document.querySelector(".image-container").innerHTML = `<div class="image-container">
        <img class="bg" src="images/perfect thumbnail 4.webp" alt="">
      </div>`;
        document.querySelector(".not-found-js").innerHTML = ''
        productIdList = [...new Set(productIdList)]
        let filteredProduct = []
        productIdList.forEach(productId => {
          filteredProduct.push(getmatchingProduct(productId));
          console.log(filteredProduct);
        });
        renderProductGrid(filteredProduct);
      }
    }
  });
  
}


