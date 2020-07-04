const desctructurePrice = (price) => {
    let newPrice = price.split(" ");
    newPrice = newPrice[1].split(',');
    newPrice = newPrice[0]+"."+newPrice[1];

    return newPrice;
}

const selectedProduct = (products, code_color) => {
    let selected_Product = {};
    
    for(var i=0;i<products.length; i++)
    {
        if(products[i].code_color === code_color)
        {
            selected_Product = {
                name: products[i].name,
                price: products[i].regular_price,
                promotion: products[i].actual_price,
                image: products[i].image,
                sizes: products[i].sizes,
                discount: products[i].discount_percentage,
                payment: products[i].installments,
            }
            if(selected_Product.promotion==='')
            {
                selected_Product = {
                    ...selected_Product,
                    totalPrice: selected_Product.price
                }
            }
            else
            {
                selected_Product = {
                    ...selected_Product,
                    totalPrice: selected_Product.promotion
                }
            }
        }
    }
    return selected_Product;
}

export {
    desctructurePrice,
    selectedProduct
};