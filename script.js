// Sample Jewellery Product Data
const products = [
    { id: 1, name: "Custom Name Necklace", price: 65.00, image: "placeholder_necklace.jpg", description: "Personalized script font necklace." },
    { id: 2, name: "Birthstone Ring", price: 120.00, image: "placeholder_ring.jpg", description: "Choose your month's stone." },
    { id: 3, name: "Engraved Bracelet", price: 85.00, image: "placeholder_bracelet.jpg", description: "Text or symbol engraving." }
];

let cart = [];
let wishlist = [];

// --- UTILITY FUNCTIONS ---

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // Create the product card element
        const card = document.createElement('div');
        card.className = 'product-card';

        // Product Image (Placeholder)
        // NOTE: In a real site, you'd replace 'placeholder_...' with actual image paths.
        card.innerHTML += <img src="https://via.placeholder.com/300x200?text=${product.name.replace(/\s/g, '+')}" alt="${product.name}">;

        // Product Name and Description
        card.innerHTML += <h3>${product.name}</h3>;
        card.innerHTML += <p>${product.description}</p>;
        
        // Product Price
        card.innerHTML += <div class="price">$${product.price.toFixed(2)}</div>;

        // Add to Cart Button
        card.innerHTML += <button onclick="addToCart(${product.id})">Add to Cart</button>;

        // Wishlist Button
        card.innerHTML += <button onclick="addToWishlist(${product.id})">Wishlist</button>;

        container.appendChild(card);
    });
}

function updateCounts() {
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('wishlist-count').textContent = wishlist.length;
}

function openPopup(id) {
    document.getElementById(id).style.display = 'block';
    if (id === 'cart-popup') renderCart();
    if (id === 'wishlist-popup') renderWishlist();
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}


// --- FEATURE FUNCTIONS ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCounts();
        alert(${product.name} added to cart!);
    }
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    // Prevent duplicates in the wishlist
    const exists = wishlist.some(p => p.id === productId);
    
    if (product && !exists) {
        wishlist.push(product);
        updateCounts();
        alert(${product.name} added to wishlist!);
    } else if (exists) {
        alert(${product.name} is already in your wishlist.);
    }
}

function renderCart() {
    const cartList = document.getElementById('cart-items');
    let total = 0;
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = <span>${item.name}</span><span>$${item.price.toFixed(2)}</span>;
            cartList.appendChild(li);
            total += item.price;
        });
    }

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function renderWishlist() {
    const wishlistList = document.getElementById('wishlist-items');
    wishlistList.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistList.innerHTML = '<li>Your wishlist is empty.</li>';
    } else {
        wishlist.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = <span>${item.name}</span><span>$${item.price.toFixed(2)}</span>;
            wishlistList.appendChild(li);
        });
    }
}

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCounts();

    // Attach event listeners to open popups using the navigation links
    document.querySelector('a[href="#cart"]').onclick = (e) => { e.preventDefault(); openPopup('cart-popup'); };
    document.querySelector('a[href="#wishlist"]').onclick = (e) => { e.preventDefault(); openPopup('wishlist-popup'); };
});