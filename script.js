let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = cart.reduce((total, item) => total + item.price, 0);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const validUsername = "jalal"; // Replace with your desired username
    const validPassword = "123"; // Replace with your desired password

    if (username === '' || password === '') {
        alert('Please fill in both fields.');
    } else if (username === validUsername && password === validPassword) {
        alert('Logged in successfully as: ' + username);
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    totalPrice += productPrice;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function removeFromCart(index) {
    // Check if the index is valid
    if (index < 0 || index >= cart.length) {
        console.error("Invalid index for cart removal");
        return;
    }
    
    // Decrease total price and remove the product
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Refresh the displayed cart items
    displayCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

// Call this function when the home page loads
window.onload = function() {
    updateCartCount(); // Update cart count on home page
};

// Display cart items on cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div>
                ${item.name} - $${item.price.toFixed(2)} 
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Call displayCartItems when the cart page loads
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
    updateCartCount();
}

function checkout() {
    alert("Checkout functionality is not implemented yet!");
}

function searchProducts() {
    const input = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block'; // Show matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
}