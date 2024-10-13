import {addtocart,cart,loadtoStorage} from '../../data/cart.js';

describe("test-suit : addtoCart",()=>{
    it("cart-new-product-test-2",() => {

        spyOn(localStorage, 'setItem')

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })
        loadtoStorage();

        addtocart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart[0].Product_id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart[0].quantity).toEqual(1)
    });
});

