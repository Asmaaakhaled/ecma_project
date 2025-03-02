document.addEventListener("DOMContentLoaded", function () {
    let listCartHTML = document.querySelector('.listCart');
    let carts = JSON.parse(localStorage.getItem('cart')) || [];
    let listProducts = JSON.parse(localStorage.getItem('products')) || [];

    const displayCart = () => {
        listCartHTML.innerHTML = '';

        if (carts.length > 0) {
            carts.forEach(cart => {
                let product = listProducts.find(p => p.id == cart.product_id);

                if (product) {
                    let newCart = document.createElement('div');
                    newCart.classList.add('col-md-4', 'mb-4');

                    newCart.innerHTML = `
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">Price: $${product.price}</p>
                                <p class="card-text">Quantity: <strong>${cart.quantity}</strong></p>
                                <p class="card-text">Total: $${(product.price * cart.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    `;

                    listCartHTML.appendChild(newCart);
                }
            });
        } else {
            listCartHTML.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        }
    };

    // Clear cart 
    document.querySelector('.clearCart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        carts = [];
        displayCart();
    });

    displayCart();
});




