// Cart Page JavaScript

// Get cart from memory
let cart = [];

// Load cart from memory on page load
// Load cart from memory on page load (safe version)
function loadCart() {
    try {
        cart = JSON.parse(localStorage.getItem('holidayBrewCart')) || [];
    } catch {
        cart = [];
        localStorage.removeItem('holidayBrewCart');
    }
    renderCart();
    updateSummary();
}


// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartCount = document.getElementById('cart-count');
    
    if (cart.length === 0) {
        cartItemsContainer.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        cartCount.textContent = '0 items in your cart';
        return;
    }
    
    function getTotalItemCount() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    cartItemsContainer.classList.remove('hidden');
    emptyCart.classList.add('hidden');
    cartCount.textContent = `${getTotalItemCount()} item${getTotalItemCount() > 1 ? 's' : ''} in your cart`;

    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
            <div class="flex gap-4">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-serif text-lg text-coffee-900">${item.name}</h3>
                            <p class="text-sm text-coffee-700">${item.description}</p>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="text-festive-red hover:text-red-700 transition-colors">
                            <i class="ph ph-trash text-xl"></i>
                        </button>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <button onclick="decreaseQuantity(${item.id})" class="w-8 h-8 rounded-full bg-coffee-100 hover:bg-festive-red hover:text-white transition-all flex items-center justify-center">
                                <i class="ph ph-minus"></i>
                            </button>
                            <span class="font-medium text-coffee-900 w-8 text-center">${item.quantity}</span>
                            <button onclick="increaseQuantity(${item.id})" class="w-8 h-8 rounded-full bg-coffee-100 hover:bg-festive-green hover:text-white transition-all flex items-center justify-center">
                                <i class="ph ph-plus"></i>
                            </button>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-coffee-700">₹${item.price.toFixed(2)} each</p>
                            <p class="font-bold text-festive-gold text-lg">₹${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Update order summary
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.00 : 0;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = cart.length > 0 ? `₹${shipping.toFixed(2)}` : 'FREE';
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    
    // Save updated summary to localStorage for checkout
    const cartSummary = {
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
    };
    localStorage.setItem('holidayBrewCartSummary', JSON.stringify(cartSummary));
    
    // Disable checkout if cart is empty
    const checkoutBtn = document.getElementById('checkout-btn');
    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        renderCart();
        updateSummary();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCart();
        updateSummary();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
    updateSummary();
    showNotification('Item removed from cart');
}

// Save cart to memory
function saveCart() {
    localStorage.setItem('holidayBrewCart', JSON.stringify(cart));
    // Trigger storage event for other tabs/pages
    window.dispatchEvent(new Event('storage'));
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const promoMessage = document.getElementById('promo-message');
    const code = promoInput.value.trim().toUpperCase();
    
    const validCodes = {
        'HOLIDAY25': 0.25,
        'FESTIVE10': 0.10,
        'NEWYEAR15': 0.15
    };
    
    if (validCodes[code]) {
        const discount = validCodes[code];
        promoMessage.textContent = `✓ ${code} applied! You saved ${(discount * 100)}%`;
        promoMessage.className = 'text-xs mt-2 text-festive-green';
        promoMessage.classList.remove('hidden');
        showNotification(`Promo code applied! ${(discount * 100)}% off`, 'success');
        
        // Apply discount to summary by recalculating from cart
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountedSubtotal = subtotal * (1 - discount);
        const shipping = cart.length > 0 ? 5.00 : 0;
        const tax = discountedSubtotal * 0.10;
        const total = discountedSubtotal + shipping + tax;
        
        document.getElementById('subtotal').textContent = `₹${discountedSubtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
        
        // Update cart summary in localStorage
        const cartSummary = {
            subtotal: discountedSubtotal,
            shipping: shipping,
            tax: tax,
            total: total,
            discount: discount,
            promoCode: code
        };
        localStorage.setItem('holidayBrewCartSummary', JSON.stringify(cartSummary));
    } else {
        promoMessage.textContent = '✗ Invalid promo code';
        promoMessage.className = 'text-xs mt-2 text-festive-red';
        promoMessage.classList.remove('hidden');
        showNotification('Invalid promo code', 'error');
    }
    
    setTimeout(() => {
        promoMessage.classList.add('hidden');
    }, 5000);
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('holidayBrewUser') || 'null');
    if (!user || !user.loggedIn) {
        showNotification('Please login to continue', 'error');
        setTimeout(() => {
            window.location.href = '/login?return=/checkout';
        }, 1500);
        return;
    }
    
    // Save cart summary for checkout page
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;
    
    const cartSummary = {
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
    };
    
    localStorage.setItem('holidayBrewCartSummary', JSON.stringify(cartSummary));
    
    window.location.href = '/checkout';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-festive-green' : 'bg-festive-red';
    notification.className = `fixed top-28 right-6 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3`;
    notification.innerHTML = `
        <i class="ph-fill ph-${type === 'success' ? 'check' : 'warning'}-circle text-2xl"></i>
        <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Snow effect
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    
    const snowflakeChars = ['❅', '❆', '❄'];
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 0.5 + 0.5) + 'em';
        snowflake.style.opacity = Math.random() * 0.6 + 0.3;
        snowflake.style.animationDuration = (Math.random() * 10 + 10) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        
        snowContainer.appendChild(snowflake);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSnowEffect();
    loadCart();
    console.log('🛒 Cart page initialized');
});