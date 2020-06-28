const purchase = (selectedProduct, purchProducts, size, totalPrice) => {
    document.getElementById('purchase').classList.add('cat__route__purchase--clicked');

    if(purchProducts.length===0)
    {
        let amount=parseInt(document.getElementById('amount').textContent);
        let product = [];

        let destructurePrice = selectedProduct.totalPrice.split(" ");
        let convertPrice = destructurePrice[1].split(',');
        let price=convertPrice[0]+'.'+convertPrice[1];
        
        let total_price = [price*amount];
        
        product.push({
            id: purchProducts.length,
            name: selectedProduct.name,
            image: selectedProduct.image,
            chosenSize: size,
            price: price*amount,
            amount: amount,
        });
        let prices;
        prices = total_price;

        return { product, prices };
    }
    else
    {
        let product=[];
        let prices = [];
        let amount = parseInt(document.getElementById('amount').textContent);
        let price = selectedProduct.totalPrice.split(" ");

        price = price[1].split(',');
        price = (price[0] +'.'+ price[1])*amount;

        prices = [...totalPrice];
        product = [...purchProducts];
        
        product.push({
            id: purchProducts.length,
            name: selectedProduct.name,
            image: selectedProduct.image,
            chosenSize: size,
            price: price,
            amount: amount
        })
        prices.push(price);
        return { product, prices };
    }
};

export default purchase;