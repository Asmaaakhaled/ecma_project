

let listProductHTML = document.querySelector('.listProduct');
let cartCount = document.getElementById('cart-count');

let listProducts = [
    { id: 1, name: "Watch A", price: 100, image: "images/Watch 1.jpg", category: "watches", details: "Stylish Watch A" },
    { id: 2, name: "Watch B", price: 200, image: "images/Watch 2.PNG", category: "watches", details: "Elegant Watch B" },
    { id: 3, name: "Bag A", price: 300, image: "images/bag1.jpg", category: "bags", details: "High-quality Bag A" },
    { id: 4, name: "Bag B", price: 400, image: "images/bag2.webp", category: "bags", details: "Trendy Bag B." },
    { id: 5, name: "Accessory A", price: 500, image: "images/acc1.jpg", category: "accessories", details: "Fancy Accessory A" },
    { id: 6, name: "Accessory B", price: 600, image: "images/acc2.webp", category: "accessories", details: "Luxury Accessory B" },
    { id: 7, name: "Watch C", price: 700, image: "images/Watch 3.PNG", category: "watches", details: "Classic Watch C" },
    { id: 8, name: "Bag C", price: 800, image: "images/bag3.webp", category: "bags", details: "Leather Bag C." },
    { id: 9, name: "Accessory C", price: 550, image: "images/acc3.jpg", category: "accessories", details: "Fancy Accessory C" },
];


if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(listProducts));
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartCount = () => {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
};


const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    let row;

    listProducts.forEach((product, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'g-4');
            listProductHTML.appendChild(row);
        }

        let col = document.createElement('div');
        col.classList.add('col-md-4');
        col.dataset.id = product.id;

        let productInCart = cart.find(item => item.product_id == product.id);
        let quantity = productInCart ? productInCart.quantity : 0;

        col.innerHTML = `
            <div class="card p-3 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text price">$${product.price}</p>

                    <div class="quantity-controls my-2">
                        <button class="btn btn-outline-danger minus" data-id="${product.id}">-</button>
                        <span class="count">${quantity}</span>
                        <button class="btn btn-outline-danger plus" data-id="${product.id}">+</button>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-primary addCart w-50" data-id="${product.id}">Add to Cart</button>
                        <button class="btn btn-secondary showMore w-50" data-id="${product.id}">Show More</button>
                    </div>

                    <p class="product-details mt-2" id="details-${product.id}" style="display: none;">
                        ${product.details}
                    </p>
                </div>
            </div>
        `;

        row.appendChild(col);
    });
};

// Handle click events on product list
listProductHTML.addEventListener('click', event => {
    let button = event.target;
    let productId = button.dataset.id;

    if (!productId) return;

    let product = listProducts.find(p => p.id == productId);
    let productInCart = cart.find(item => item.product_id == productId);

    if (button.classList.contains('plus') || button.classList.contains('minus')) {
        let quantitySpan = button.parentElement.querySelector('.count');
    
        if (button.classList.contains('plus')) {
            if (!productInCart) {
                productInCart = { product_id: productId, quantity: 1 };
                cart.push(productInCart);
            } else {
                productInCart.quantity++;
            }
        } else if (button.classList.contains('minus')) {
            if (productInCart && productInCart.quantity > 0) {
                productInCart.quantity--;
                if (productInCart.quantity === 0) {
                    cart = cart.filter(item => item.product_id != productId);
                }
            }
        }
    
        quantitySpan.innerText = productInCart ? productInCart.quantity : 0;
        saveCartToLocalStorage();
        updateCartCount();
    } else if (button.classList.contains('addCart')) {
        if (!productInCart) {
            productInCart = { product_id: productId, quantity: 1 };
            cart.push(productInCart);
            alert(`Added ${product.name} to cart`);
        } else {
            alert(`${product.name} is already in the cart`);
        }

        saveCartToLocalStorage();
        updateCartCount();
    } else if (button.classList.contains('showMore')) {
        let detailsParagraph = document.getElementById(`details-${productId}`);
    
        if (detailsParagraph.style.display === "none" || detailsParagraph.style.display === "") {
            detailsParagraph.style.display = "block";
            button.textContent = "Show Less";
        } else {
            detailsParagraph.style.display = "none";
            button.textContent = "Show More";
        }
    }
});


document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        let category = button.dataset.category;
        let filteredProducts = category === "all" ? listProducts : listProducts.filter(p => p.category === category);
        renderFilteredProducts(filteredProducts);
    });
});


const renderFilteredProducts = (filteredProducts) => {
    listProductHTML.innerHTML = "";
    let row;

    filteredProducts.forEach((product, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'g-4');
            listProductHTML.appendChild(row);
        }

        let col = document.createElement('div');
        col.classList.add('col-md-4');
        col.dataset.id = product.id;

        let productInCart = cart.find(item => item.product_id == product.id);
        let quantity = productInCart ? productInCart.quantity : 0;

        col.innerHTML = `
            <div class="card p-3 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text price">$${product.price}</p>

                    <div class="quantity-controls my-2">
                        <button class="btn btn-outline-danger minus" data-id="${product.id}">-</button>
                        <span class="count">${quantity}</span>
                        <button class="btn btn-outline-success plus" data-id="${product.id}">+</button>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-primary addCart w-50" data-id="${product.id}">Add to Cart</button>
                        <button class="btn btn-secondary showMore w-50" data-id="${product.id}">Show More</button>
                    </div>
                </div>
            </div>
        `;

        row.appendChild(col);
    });
};


addDataToHTML();
updateCartCount();


// slider-----------------------------


let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
}


setInterval(() => changeSlide(1), 3000);


document.addEventListener("DOMContentLoaded", function () {
    updateNavbarUser();
});

function updateNavbarUser() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let userNameDisplay = document.getElementById("userName");
    let logoutBtn = document.getElementById("logoutBtn");

    if (user && user.name) {
        userNameDisplay.textContent = `👤 ${user.name}`;
        logoutBtn.style.display = "inline-block";
    } else {
        userNameDisplay.textContent = "Guest";
        logoutBtn.style.display = "none"; 
    }
}


function logoutUser() {
    localStorage.removeItem("loggedInUser");
    updateNavbarUser(); 
    window.location.href = "login.html"; 
}


document.getElementById("logoutBtn").addEventListener("click", logoutUser);












