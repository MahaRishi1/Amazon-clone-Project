export const orders = JSON.parse(localStorage.getItem('orders')) || []

export function addOrder(order){
    orders.unshift(order)
    savetostorage();
}

function savetostorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}