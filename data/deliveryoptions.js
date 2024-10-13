export const deliveryoption = [
    {
        id : '1',
        deliveryDays : 7,
        amount: 0
    },
    {
        id : '2',
        deliveryDays: 3,
        amount: 49
    },
    {
        id : '3',
        deliveryDays: 1,
        amount: 99
    }
];

export function getdeliverydetails(deliveryoptionId){
    let deliveryOpt;
      deliveryoption.forEach(option => {
        if(option.id === deliveryoptionId){
          deliveryOpt = option;
        }
      });

    return deliveryOpt || deliveryoption[0];
}