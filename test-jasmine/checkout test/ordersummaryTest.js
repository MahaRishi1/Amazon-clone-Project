import {renderOrderSummary} from '../../script/checkout/ordersummary.js';
import {loadtoStorage} from '../../data/cart.js';

describe("test suite : Display the page", ()=>{
    it("order Summary", () => {
        document.querySelector(".display-test").innerHTML = `
            <div class="order-summary" ></div>
        `;
        document.querySelector(".delete-quantity-link")

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([         
                {
                    Product_id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity : 2,
                    deliveryoptionId: '1'
                },
                {
                    Product_id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity : 1,
                    deliveryoptionId: '2'
                }
            ]);
        });
        loadtoStorage();
        renderOrderSummary();
    })
})